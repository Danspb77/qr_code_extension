document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('qrForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const text = document.getElementById('textInput').value;
        generateQRCode(text);
    });

    function generateQRCode(text) {
        const size = 21; // Fixed size for simplicity
        const scale = 10; // Scale factor for canvas rendering
        const qrMatrix = createQRMatrix(text, size);

        const canvas = document.getElementById('qrcode');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (qrMatrix[y][x]) {
                    ctx.fillRect(x * scale, y * scale, scale, scale);
                }
            }
        }
    }

    function createQRMatrix(text, size) {
        const matrix = Array.from({ length: size }, () => Array(size).fill(false));
        addFinderPatterns(matrix);

        const binaryData = textToBinary(text);
        let index = 0;
        let up = true;
        for (let x = size - 1; x >= 0; x -= 2) {
            if (x == 6) x--; // Skip vertical timing pattern
            for (let y = up ? size - 1 : 0; up ? y >= 0 : y < size; y += up ? -1 : 1) {
                for (let k = 0; k < 2; k++) {
                    if (matrix[y][x - k] === false && index < binaryData.length) {
                        matrix[y][x - k] = binaryData[index++] === '1';
                    }
                }
            }
        }

        return matrix;
    }

    function addFinderPatterns(matrix) {
        const positions = [[0, 0], [0, matrix.length - 7], [matrix.length - 7, 0]];
        positions.forEach(([row, col]) => {
            for (let y = 0; y < 7; y++) {
                for (let x = 0; x < 7; x++) {
                    const isBorder = y === 0 || y === 6 || x === 0 || x === 6;
                    const isCenter = y >= 2 && y <= 4 && x >= 2 && x <= 4;
                    if (isBorder || isCenter) {
                        matrix[row + y][col + x] = true;
                    }
                }
            }
        });
    }

    function textToBinary(text) {
        return text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join('');
    }
});
