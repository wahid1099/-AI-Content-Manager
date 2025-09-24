// Demo script to test API endpoints
import { authAPI } from "./auth";

export const testAPI = async () => {
  console.log("Testing API endpoints...");

  try {
    // Test registration with dummy data
    const registerData = {
      name: "John Doe",
      username: "johnd2",
      email: "johndoe1@example.com",
      password: "StrongPass123",
      role: "user",
      phone: "+8801712345678",
      city: "Dhaka",
      state: "Dhaka",
      zipCode: "1207",
      country: "Bangladesh",
    };

    console.log("Testing registration...");
    const registerResponse = await authAPI.register(registerData);
    console.log("Registration response:", registerResponse);

    // Test login
    console.log("Testing login...");
    const loginResponse = await authAPI.login({
      email: registerData.email,
      password: registerData.password,
    });
    console.log("Login response:", loginResponse);

    // Test profile fetch if login successful
    if (loginResponse.success && loginResponse.data?.accessToken) {
      console.log("Testing profile fetch...");
      const profileResponse = await authAPI.getProfile(
        loginResponse.data.accessToken
      );
      console.log("Profile response:", profileResponse);
    }
  } catch (error) {
    console.error("API test error:", error);
  }
};

// Example of complete authentication flow
export const exampleAuthFlow = async () => {
  try {
    // 1. Login
    const loginResponse = await authAPI.login({
      email: "johndoe1@example.com",
      password: "StrongPass123",
    });

    if (loginResponse.success && loginResponse.data?.accessToken) {
      console.log("✅ Login successful");

      // 2. Get access token
      const accessToken = loginResponse.data.accessToken;
      console.log("🔑 Access token received");

      // 3. Fetch user profile
      const profileResponse = await authAPI.getProfile(accessToken);

      if (profileResponse.success && profileResponse.data) {
        console.log("👤 User profile:", profileResponse.data);

        // 4. Store token and user data (this is done automatically in the app)
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_data", JSON.stringify(profileResponse.data));

        console.log("💾 Data stored successfully");
        return {
          user: profileResponse.data,
          token: accessToken,
        };
      }
    }
  } catch (error) {
    console.error("❌ Auth flow error:", error);
  }
};

// Uncomment to run the test
// testAPI();
// exampleAuthFlow();
