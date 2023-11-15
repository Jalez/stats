
const dateSanitizer = (date: string) => {
    const deadline = new Date(date);
    const now = new Date();
    const timeLeft = deadline.getTime() - now.getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

export default dateSanitizer;