// Mock authentication utilities for development
// In production, integrate with Supabase Auth or similar

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  position: string
  joinDate: string
  status: string
  avatarUrl?: string
  bio?: string
  phone?: string
}

// Mock user data for development - Following Rotary Club standards
const mockUsers: Record<string, User & { password: string }> = {
  "member@rotary.com": {
    id: "1",
    email: "member@rotary.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    position: "President",
    joinDate: "2020-01-15",
    status: "active",
    avatarUrl: "/member-avatar.jpg",
    bio: "Passionate about community service and Rotary values",
    phone: "+63-917-123-4567",
  },
  "volunteer@rotary.com": {
    id: "2",
    email: "volunteer@rotary.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Smith",
    position: "Volunteer Coordinator",
    joinDate: "2021-06-20",
    status: "active",
    avatarUrl: "/volunteer-avatar.jpg",
    bio: "Dedicated to making a difference in our community",
    phone: "+63-917-234-5678",
  },
  "treasurer@rotary.com": {
    id: "3",
    email: "treasurer@rotary.com",
    password: "password123",
    firstName: "Robert",
    lastName: "Johnson",
    position: "Treasurer",
    joinDate: "2019-03-10",
    status: "active",
    avatarUrl: "/member-avatar.jpg",
    bio: "Financial steward of the club",
    phone: "+63-917-345-6789",
  },
  "secretary@rotary.com": {
    id: "4",
    email: "secretary@rotary.com",
    password: "password123",
    firstName: "Maria",
    lastName: "Garcia",
    position: "Secretary",
    joinDate: "2022-05-05",
    status: "active",
    avatarUrl: "/volunteer-avatar.jpg",
    bio: "Keeping our club organized and connected",
    phone: "+63-917-456-7890",
  },
}

export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const mockUser = mockUsers[email.toLowerCase().trim()]
  if (mockUser && mockUser.password === password) {
    const { password: _, ...user } = mockUser
    return {
      user,
      token: btoa(`${email}:${Date.now()}:${Math.random()}`),
    }
  }
  return null
}

export async function getCurrentUser(token: string): Promise<User | null> {
  // In production, verify token with backend
  if (!token) return null
  try {
    const decoded = atob(token)
    const email = decoded.split(":")[0]
    const mockUser = mockUsers[email.toLowerCase().trim()]
    if (mockUser) {
      const { password: _, ...user } = mockUser
      return user
    }
  } catch {
    return null
  }
  return null
}

export function logoutUser(): void {
  // Clear session
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
  }
}
