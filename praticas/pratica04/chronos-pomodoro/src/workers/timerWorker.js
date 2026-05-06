let isRunning = false;
let timeoutId = null;

self.onmessage = function (event) {
    if (isRunning) return;

    isRunning = true;

    const state = event.data;
    const { activeTask, secondsRemaining } = state;

    const startDate =
        typeof activeTask.startDate === 'string'
            ? new Date(activeTask.startDate).getTime()
            : activeTask.startDate;

    const endDate = startDate + secondsRemaining * 1000;

    function tick() {
        const now = Date.now();
        const countDownSeconds = Math.max(
            0,
            Math.ceil((endDate - now) / 1000)
        );

        self.postMessage(countDownSeconds);

        if (countDownSeconds <= 0) {
            isRunning = false;
            return;
        }

        timeoutId = setTimeout(tick, 1000);
    }

    tick();
};
