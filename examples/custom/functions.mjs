export function lightOrDark(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP Equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    if (hsp > 127.5) { return 'light'; }
    else { return 'dark'; }
}

export function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    let r = Math.trunc(255 * f(0));
    let g = Math.trunc(255 * f(8));
    let b = Math.trunc(255 * f(4));

    let rgbStr = rgb2sixDigitHex({ r, g, b })
    return rgbStr.toString();
};

function rgb2sixDigitHex({ r, g, b }) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length === 1) { r = '0' + r; }
    if (g.length === 1) { g = '0' + g; }
    if (b.length === 1) { b = '0' + b; }
    return '#' + r + g + b;
}

export default { lightOrDark, HSLToRGB };