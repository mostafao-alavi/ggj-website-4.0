import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Reuse the existing Firebase app if already initialized, otherwise initialize it.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Request required Google Workspace scopes for Sheets and Drive
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  // Try to load cached token from session memory if present (avoiding localStorage for security)
  const sessionToken = sessionStorage.getItem('ggj_g_token');
  if (sessionToken) {
    cachedAccessToken = sessionToken;
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      sessionStorage.removeItem('ggj_g_token');
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Start Google sign-in flow
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('دریافت توکن دسترسی از گوگل با خطا مواجه شد.');
    }

    cachedAccessToken = credential.accessToken;
    sessionStorage.setItem('ggj_g_token', cachedAccessToken);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken || sessionStorage.getItem('ggj_g_token');
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  sessionStorage.removeItem('ggj_g_token');
};

// Check if user is logged in
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// --- Google Sheets API Helpers ---

// Create a new Spreadsheet
export const createGGJSpreadsheet = async (token: string): Promise<string> => {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: 'Global Game Jam Iran 2026 - مانیتورینگ رویداد'
      },
      sheets: [
        {
          properties: {
            title: 'داوطلبان',
            gridProperties: {
              frozenRowCount: 1
            }
          }
        },
        {
          properties: {
            title: 'ایده‌های هوش مصنوعی',
            gridProperties: {
              frozenRowCount: 1
            }
          }
        }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`خطا در ساخت شیت: ${err}`);
  }

  const data: any = await response.json();
  const spreadsheetId = data.spreadsheetId;

  // Initialize headers for both sheets
  await initializeSheetHeaders(token, spreadsheetId);

  return spreadsheetId;
};

// Initialize Headers
const initializeSheetHeaders = async (token: string, spreadsheetId: string) => {
  // Headers for Volunteers
  const volunteerHeaders = [
    ['نام و نام خانوادگی', 'ایمیل', 'شماره تماس', 'شهر', 'نقش پیشنهادی', 'سوابق و مهارت‌ها', 'آدرس گیت‌هاب / رزومه', 'تاریخ ثبت نام']
  ];

  // Headers for AI Ideas
  const aiIdeasHeaders = [
    ['عنوان بازی', 'تم/موضوع اصلی', 'سبک بازی', 'پلتفرم هدف', 'محدودیت‌های بازی', 'مفهوم اصلی بازی', 'پیچش خلاقانه', 'سبک هنری پیشنهادی', 'تاریخ ایده پردازی']
  ];

  // Write headers to sheets
  await writeToSheetRange(token, spreadsheetId, 'داوطلبان!A1:H1', volunteerHeaders);
  await writeToSheetRange(token, spreadsheetId, 'ایده‌های هوش مصنوعی!A1:I1', aiIdeasHeaders);
};

// Write specific range values
export const writeToSheetRange = async (token: string, spreadsheetId: string, range: string, values: any[][]) => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`خطا در به روزرسانی شیت: ${err}`);
  }
};

// Append row to sheet
export const appendRowToSheet = async (token: string, spreadsheetId: string, sheetName: string, rowValues: any[]) => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [rowValues]
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`خطا در ثبت اطلاعات در گوگل شیت: ${err}`);
  }
};

// Read sheet data
export const readSheetData = async (token: string, spreadsheetId: string, range: string): Promise<any[][]> => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`خطا در خواندن اطلاعات از گوگل شیت: ${err}`);
  }

  const data: any = await response.json();
  return data.values || [];
};
