import './App.css';
import React, { Component } from 'react';
import Button from './button';
import Keypad from './keypad';
import Display from './display';

class App extends Component {
  digit = {
    0: '',
    1: '\u1369',
    2: '\u136A',
    3: '\u136B',
    4: '\u136C',
    5: '\u136D',
    6: '\u136E',
    7: '\u136F',
    8: '\u1370',
    9: '\u1371',
    10: '\u1372',
    20: '\u1373',
    30: '\u1374',
    40: '\u1375',
    50: '\u1376',
    60: '\u1377',
    70: '\u1378',
    80: '\u1379',
    90: '\u137A',
    100: '\u137B',
    10000: '\u137C'
  }


  constructor() {
    super();
    this.state = { data: '', value: '' }
  }

  calculate = () => {
    try {
      const result = eval(this.state.value);
      this.setState({ data: result, value: result });
    } catch (e) {
      this.setState({ data: 'error', value: 'error' })
    }
  }

  handleClick = e => {
    const value = e.target.getAttribute('data-value');
    switch (value) {
      case 'clear':
        this.setState({ data: '', value: '' });
        break;
      case 'equal':
        this.calculate();
        break;
      default:
        this.setState({ data: (this.state.data + value), value: (this.state.value + value) });
        window.alert(this.state.value);
    }
  }

  translate = (number) => {
    const sign = number < 0;
    number = Math.abs(number);
    let geeznumber = '';
    if (Number.isInteger(number)) {
      geeznumber = this.translator(number)
    }
    else {
      let decimal = number.toString();
      decimal = decimal.split('.');
      geeznumber = this.translator_decimal(parseInt(decimal[1])) + geeznumber;
      const afterdecimal = parseInt(decimal[0]);
      if (afterdecimal === 0) {
        geeznumber = `${'\u12D0' + '.'}${geeznumber}`;
      } else {
        geeznumber = `${this.translator(afterdecimal)}.${geeznumber}`;
      }
    }


    if (sign) {
      geeznumber = `-${geeznumber}`;
    }

    return geeznumber;
  }

  translator = (number) => {
    let geeznumber = ''
    let tmp = number;
    let digits = 0;
    while (tmp > 0) {
      digits++;
      tmp = Math.floor(tmp / 10);
    }
    if (digits <= 4) {
      geeznumber = this.translator_lessdigit(number);
    } else if (digits > 4) {
      geeznumber = this.translator_moredigits(number);
    }

    return geeznumber;
  }

  translator_decimal = (number) => {
    let geeznumber = '';
    let tmp = 0;
    while (number > 0) {
      tmp = number % 10;
      geeznumber = this.digit[tmp] + geeznumber;
      number = Math.floor(number / 10);
    }

    return geeznumber;
  }

  translator_lessdigit = (number) => {
    let geeznumber = '';
    let i = 0;
    let tmp = 0;
    while (number > 0) {
      tmp = number % 10;
      if (i === 2) {
        i = 0;
        geeznumber = this.digit[100] + geeznumber;
        while (number > 0) {
          tmp = number % 10;
          geeznumber = this.digit[tmp * (10 ** i)] + geeznumber;
          number = Math.floor(number / 10);
          i++;
        }
        break;
      } else {
        geeznumber = this.digit[tmp * (10 ** i)] + geeznumber;
      }
      number = Math.floor(number / 10);
      i += 1;
    }
    geeznumber = this.digit[number] + geeznumber;
    return geeznumber;
  }

  translator_moredigits = (number) => {
    let geeznumber = '';
    geeznumber = this.translator_lessdigit(number % 10000) + geeznumber;
    number = number = Math.floor(number / 10000);
    geeznumber = this.translator(number) + this.digit[10000] + geeznumber;
    return geeznumber;
  }

  render() {
    return (
      <div className="Calculator">
        <Display data={this.translator(this.state.data)} value={this.state.value} />
        <Keypad>
          <Button onClick={this.handleClick} label="C" value="clear" />
          <Button onClick={this.handleClick} label={this.translator(7)} value="7" />
          <Button onClick={this.handleClick} label={this.translator(4)} value="4" />
          <Button onClick={this.handleClick} label={this.translator(1)} value="1" />
          <Button onClick={this.handleClick} label={this.translator(0)} value="0" />

          <Button onClick={this.handleClick} label="/" value="/" />
          <Button onClick={this.handleClick} label={this.translator(8)} value="8" />
          <Button onClick={this.handleClick} label={this.translator(5)} value="5" />
          <Button onClick={this.handleClick} label={this.translator(2)} value="2" />
          <Button onClick={this.handleClick} label="." value="." />

          <Button onClick={this.handleClick} label="x" value="*" />
          <Button onClick={this.handleClick} label={this.translator(9)} value="9" />
          <Button onClick={this.handleClick} label={this.translator(6)} value="6" />
          <Button onClick={this.handleClick} label={this.translator(3)} value="3" />
          <Button onClick={this.handleClick} label="" value="null" />

          <Button onClick={this.handleClick} label="-" value="-" />
          <Button onClick={this.handleClick} label="+" size="2" value="+" />
          <Button onClick={this.handleClick} label="=" size="2" value="equal" />
        </Keypad>
      </div>
    );
  }
}

export default App;
