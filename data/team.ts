// data/team.ts
export interface TeamMember {
  name: string
  role: string
  avatar?: string
  bio?: string
  social?: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ayu Prameswari",
    role: "Research Lead",
    bio: "Cultural anthropologist specializing in East Javanese traditions",
  },
  {
    name: "Bagus Santosa",
    role: "Data Engineer",
    bio: "Building robust data infrastructure for cultural preservation",
  },
  // ... lengkapi semua members
]

export function getTeamMembers(): TeamMember[] {
  return TEAM_MEMBERS
}

export function getTeamMembersByRole(role: string): TeamMember[] {
  return TEAM_MEMBERS.filter(m => m.role.includes(role))
}
