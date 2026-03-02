export function getAvatarUrl(avatar: string): string {
    if (!avatar) return "/assets/default-avatar.png";
    if (avatar.startsWith("http")) return avatar;
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${avatar}`;
}
