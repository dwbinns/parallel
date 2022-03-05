export default function parallel(count) {
    let workers = [];
    let queue = [];

    return task => {
        let promise = new Promise((resolve, reject) => queue.push(() => task().then(resolve, reject)));
        if (workers.length < count) {
            let worker = async () => {
                while (queue.length) {
                    await queue.pop()().catch(() => 0);
                }
                workers = workers.filter(w => w != worker)
            };
            workers.push(worker);
            worker();
        }
        return promise;
    }
}

