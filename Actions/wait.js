module.exports = {
    name: 'wait',
    async execute({ params }) {
        const duration = parseInt(params, 10);
        if (!isNaN(duration)) {
            await new Promise(resolve => setTimeout(resolve, duration));
        }
    },
};
