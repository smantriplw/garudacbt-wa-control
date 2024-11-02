export const safeJsonParse = <T>(stringJson: string) => {
	try {
		return JSON.parse(stringJson) as T;
	} catch {
		return undefined;
	}
};
