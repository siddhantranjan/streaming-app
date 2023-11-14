export const replacer = (key: string, value: string) => {
    if (key && _isBlacklisted(key)) {
        return ("[sanitized]");
    }else if(key && key === 'phone'){
        return '*'.repeat(6) + value.substring(value.length - 4, value.length)
    }
    return value;
}

const _isBlacklisted = (key: string) => {
    key = key.toLowerCase();

    let blackiListedKeys = ['created_date', 'password', 'cover_image_src', 'profile_image_src']
    return blackiListedKeys.includes(key)
}
