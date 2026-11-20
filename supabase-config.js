// ============================================================
//  SEY JOURNAL — Supabase Client Config
//  Included AFTER the Supabase CDN script on every page
// ============================================================

const SUPABASE_URL     = 'https://etstrfgxksmwympjuhhb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8IndtVnPl1vP6AVAl1wecg_mF2g8HSv';

// Wait until supabase global is available (loaded via CDN)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
