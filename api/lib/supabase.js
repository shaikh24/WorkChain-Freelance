const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) {
  console.error("❌ Missing environment variable: SUPABASE_URL");
  throw new Error("supabaseUrl is required.");
}

if (!supabaseKey) {
  console.error("❌ Missing environment variable: SUPABASE_KEY");
  throw new Error("supabaseKey is required.");
}

console.log("✅ Supabase client initialized with URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
