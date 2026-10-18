(() => {
  const config = window.ADMISSION_SUPABASE || {};

  window.submitAdmissionApplication = async (application) => {
    const url = (config.url || "").trim().replace(/\/$/, "");
    const anonKey = (config.anonKey || "").trim();
    if (!url.startsWith("https://") || url.includes("YOUR-PROJECT") || !anonKey || anonKey.includes("YOUR_SUPABASE")) {
      throw new Error("The database is not connected yet. Add your Supabase project URL and public anon key in supabase-config.js, then submit again.");
    }

    let response;
    try {
      response = await fetch(`${url}/rest/v1/admission_applications`, {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(application)
      });
    } catch {
      throw new Error("Could not connect to the application database. Check your internet connection and try again.");
    }

    if (!response.ok) {
      throw new Error("The application could not be saved. Check the Supabase table and access policy setup, then try again.");
    }
  };
})();

