// Get all the necessary DOM elements
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const memoryIndicatorElement = document.getElementById('memory-indicator');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const advancedButtons = document.querySelectorAll('.advanced');
const memoryButtons = document.querySelectorAll('.memory');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const decimalButton = document.getElementById('decimal');
const squareRootButton = document.getElementById('square-root');
const percentageButton = document.getElementById('percentage');
const memoryAddButton = document.getElementById('memory-add');
const memorySubtractButton = document.getElementById('memory-subtract');
const memoryRecallButton = document.getElementById('memory-recall');
const memoryClearButton = document.getElementById('memory-clear');

// Calculator class to handle all calculator operations
class Calculator {
    constructor(previousOperandElement, currentOperandElement, memoryIndicatorElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.memoryIndicatorElement = memoryIndicatorElement;
        this.clear();
        this.memoryValue = 0;
        this.hasMemory = false;
    }

    // Clear the calculator
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Delete the last digit
    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    // Append a number to the current operand
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number;
        }
    }

    // Choose an operation
    chooseOperation(operation) {
        if (this.currentOperand === '0' && this.previousOperand === '') return;
        
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    // Calculate square root
    squareRoot() {
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(current)) return;
        
        if (current < 0) {
            alert('Cannot calculate square root of a negative number!');
            return;
        }
        
        this.currentOperand = Math.sqrt(current).toString();
    }

    // Calculate percentage
    percentage() {
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(current)) return;
        
        if (this.previousOperand === '') {
            // If no operation is in progress, simply divide by 100
            this.currentOperand = (current / 100).toString();
        } else {
            // If operation is in progress, calculate percentage of the first number
            const prev = parseFloat(this.previousOperand);
            switch (this.operation) {
                case '+':
                case '-':
                    // For addition and subtraction, percentage is calculated as % of first number
                    this.currentOperand = ((prev * current) / 100).toString();
                    break;
                case '×':
                case '÷':
                    // For multiplication and division, simply divide by 100
                    this.currentOperand = (current / 100).toString();
                    break;
            }
        }
    }

    // Memory functions
    memoryAdd() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.memoryValue += current;
        this.hasMemory = true;
        this.updateMemoryIndicator();
    }

    memorySubtract() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        
        this.memoryValue -= current;
        this.hasMemory = true;
        this.updateMemoryIndicator();
    }

    memoryRecall() {
        if (this.hasMemory) {
            this.currentOperand = this.memoryValue.toString();
        }
    }

    memoryClear() {
        this.memoryValue = 0;
        this.hasMemory = false;
        this.updateMemoryIndicator();
    }

    updateMemoryIndicator() {
        if (this.hasMemory) {
            this.memoryIndicatorElement.innerText = 'M';
        } else {
            this.memoryIndicatorElement.innerText = '';
        }
    }

    // Compute the result
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Format the display number
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Update the display
    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// Initialize calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement, memoryIndicatorElement);

// Event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Skip the delete button as it's handled separately
        if (button.id === 'delete') return;
        
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Event listener for advanced operation buttons
advancedButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'square-root') {
            calculator.squareRoot();
        } else if (button.id === 'percentage') {
            calculator.percentage();
        }
        calculator.updateDisplay();
    });
});

// Event listeners for memory buttons
memoryAddButton.addEventListener('click', () => {
    calculator.memoryAdd();
});

memorySubtractButton.addEventListener('click', () => {
    calculator.memorySubtract();
});

memoryRecallButton.addEventListener('click', () => {
    calculator.memoryRecall();
    calculator.updateDisplay();
});

memoryClearButton.addEventListener('click', () => {
    calculator.memoryClear();
});

// Event listener for equals button
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Event listener for delete button
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Add keyboard support
document.addEventListener('keydown', event => {
    if (/[0-9]/.test(event.key)) {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    } else if (event.key === '.') {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    } else if (event.key === '+' || event.key === '-') {
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    } else if (event.key === '*') {
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    } else if (event.key === '/') {
        event.preventDefault(); // Prevent browser search
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    } else if (event.key === 'Enter' || event.key === '=') {
        calculator.compute();
        calculator.updateDisplay();
    } else if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    } else if (event.key === 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    } else if (event.key === '%') {
        calculator.percentage();
        calculator.updateDisplay();
    } else if (event.key === 'r' || event.key === 'R') {
        calculator.squareRoot();
        calculator.updateDisplay();
    }
}); 