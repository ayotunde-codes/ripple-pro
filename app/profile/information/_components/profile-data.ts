// Create a simplified countries list
export const countries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "ZA", name: "South Africa" },
  { code: "KE", name: "Kenya" },
  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
]

// Content types
export const contentTypes = [
  { value: "video", label: "Video" },
  { value: "photo", label: "Photo" },
  { value: "blog", label: "Blog" },
  { value: "podcast", label: "Podcast" },
]

// Categories
export const categories = [
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "fitness", label: "Fitness" },
  { value: "tech", label: "Technology" },
  { value: "gaming", label: "Gaming" },
]

// Nigerian banks list
export const nigerianBanks = [
  { code: "044", name: "Access Bank" },
  { code: "023", name: "Citibank Nigeria" },
  { code: "063", name: "Diamond Bank" },
  { code: "050", name: "Ecobank Nigeria" },
  { code: "070", name: "Fidelity Bank" },
  { code: "011", name: "First Bank of Nigeria" },
  { code: "214", name: "First City Monument Bank" },
  { code: "058", name: "Guaranty Trust Bank" },
  { code: "030", name: "Heritage Bank" },
  { code: "301", name: "Jaiz Bank" },
  { code: "082", name: "Keystone Bank" },
  { code: "526", name: "Parallex Bank" },
  { code: "076", name: "Polaris Bank" },
  { code: "101", name: "Providus Bank" },
  { code: "221", name: "Stanbic IBTC Bank" },
  { code: "068", name: "Standard Chartered Bank" },
  { code: "232", name: "Sterling Bank" },
  { code: "100", name: "Suntrust Bank" },
  { code: "032", name: "Union Bank of Nigeria" },
  { code: "033", name: "United Bank For Africa" },
  { code: "215", name: "Unity Bank" },
  { code: "035", name: "Wema Bank" },
  { code: "057", name: "Zenith Bank" },
]

// Initial profile data
export const initialProfileData = {
  firstName: "John",
  middleName: "",
  lastName: "Doe",
  email: "johndoe@example.com",
  country: "NG",
  dateOfBirth: "1990-01-01",
  contentType: "video",
  category: "lifestyle",
  instagram: "johndoe",
  facebook: "johndoe",
  twitter: "johndoe",
  tiktok: "johndoe",
  youtube: "johndoe",
  bvn: "22212345678",
  bankCode: "058",
  accountNumber: "0123456789",
  accountName: "JOHN DOE",
}

export type ProfileData = typeof initialProfileData

