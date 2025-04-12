# Advanced Calculator

A feature-rich calculator web application built with HTML, CSS, and JavaScript that performs basic and advanced arithmetic operations.

## Features

- Clean and responsive user interface
- Basic arithmetic operations: addition, subtraction, multiplication, and division
- Advanced features:
  - Square root calculations
  - Percentage operations
  - Memory functions (M+, M-, MR, MC)
- Includes decimal point support
- Error handling for:
  - Division by zero
  - Square root of negative numbers
- Clear button (AC) to reset the calculator
- Delete button (DEL) to remove the last entered digit
- Keyboard support for all operations

## How to Use

1. Open the `index.html` file in any modern web browser
2. Use the calculator by clicking the buttons or using your keyboard:

### Basic Operations
   - Numbers: 0-9 keys
   - Operations: +, -, *, / keys
   - Equals: Enter or = key
   - Clear: Escape key
   - Delete: Backspace key
   - Decimal point: . key

### Advanced Operations
   - Square Root: Click the "√" button or press "r" key
   - Percentage: Click the "%" button or press "%" key

### Memory Functions
   - Memory Clear (MC): Clears the stored value in memory
   - Memory Recall (MR): Retrieves the stored value from memory
   - Memory Add (M+): Adds the current displayed value to memory
   - Memory Subtract (M-): Subtracts the current displayed value from memory
   - When a value is stored in memory, an "M" indicator appears in the display

## Project Structure

- `index.html`: Main HTML structure
- `styles.css`: CSS styling for the calculator
- `script.js`: JavaScript code for calculator functionality

## Implementation Details

The calculator follows the BODMAS/BIDMAS order of operations by design, as it only allows for one operation at a time. When a second operation is selected before pressing equals, the first operation is computed, and the result becomes the first operand for the next operation.

Error handling is implemented for division by zero and square root of negative numbers, displaying alerts and handling these cases appropriately.

### Square Root
The square root function calculates the square root of the currently displayed number.

### Percentage
The percentage function behaves differently based on the context:
- If used without an operation in progress, it divides the current number by 100
- If used during addition or subtraction, it calculates the percentage of the first operand
- If used during multiplication or division, it simply divides the current number by 100

### Memory Functions
The calculator includes memory functionality:
- M+ adds the current value to memory
- M- subtracts the current value from memory
- MR recalls the stored memory value
- MC clears the memory
- An "M" indicator appears when a value is stored in memory 