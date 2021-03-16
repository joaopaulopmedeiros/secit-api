const mapResource = (obj) =>
    Object.entries(obj).reduce((res, [key, value]) => {
        if (Array.isArray(value)) {
            return res;
        }

        if (value == null) {
            return res;
        }

        if (typeof value === 'object' && value !== null) {
            return [...res, ...mapResource(value)];
        }

        return [...res, ...[{ key, value }]];
    }, []);
module.exports = mapResource