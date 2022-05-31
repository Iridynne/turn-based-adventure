export async function wait(miliseconds) {
    await new Promise(resolve => setTimeout(resolve, 5000));
}