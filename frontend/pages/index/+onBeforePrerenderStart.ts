export {onBeforePrerenderStart}

async function onBeforePrerenderStart() {
    return {
        url: "/",
        pageContext: {
            example: "this is data on pre render: onBeforePrerenderStart"
        }
    }
}