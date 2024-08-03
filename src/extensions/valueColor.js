
const valueColor = (value) => {
    if (value == 0)
        return "#000000"
    else if (value < 0)
        return "#FF033E"
    return "#6D9406"
}

export default valueColor