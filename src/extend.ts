export default function extend(old: {}, value: {}) : {} {
    const keys = Object.getOwnPropertyNames(value);
    keys.forEach((key: string) => {
        old[key] = value[key];
    });

    return old;
}
