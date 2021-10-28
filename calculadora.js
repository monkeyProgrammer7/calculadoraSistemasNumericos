
function isInt(n) {
    return n % 1 === 0;
}

function cambiarApariencia(button, className) {
    /**
     * variable donde se obtiene la lista de botones
     */
    var buttons = document.getElementsByClassName(className);


    /**
     * metodo donde se le quita el efecto a los botones de la misma fila, el efecto de estar presionado.
     */
    Array.prototype.forEach.call(buttons, element => {
        element.classList.replace('btn-light', 'btn-outline-light')
    });
    /**
     * acá se le asigna a un boton
     */
    button.classList.replace('btn-outline-light', 'btn-light');
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Clase que representa a un numero con un valor y una base
 */
class Numero {
    constructor(valor, base) {
        this.valor = valor;
        this.base = base;
    }

    getValor() {
        return this.valor;
    }
    getBase() {
        return this.base;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * clase que representa a un conversor entre bases numericas
 */
class Conversor {
    constructor() {
        this.cadParteDecimal = [];
        this.cadParteEntera = [];


    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //manejo de cadenas
    /**
 * Invierte una cadena
 * @param {*} texto 
 * @returns 
 */
    stringInvertido(texto) {
        return texto.split('').reverse().join('');
    }
    /**
     * transforma un vector de strings concatenando sus valores 
     ** @param {*} cadena 
     * @returns 
     */
    transformarArrayCadToString(cadena) {

        let cadNum = '';
        for (let i = 0; i < cadena.length; i++) {
            cadNum += cadena[i];

        }

        return cadNum;
    }
    /**
     * Metodo que separa un posible numero entero en 2 vectores de cadenas que corresponden a la parte entera y a la parte decimal
     * @param {*} cadNum 
     */
    separarCadPartesNumero(cadNum) {
        let arrNum = cadNum.split('');
        console.log(arrNum, 'numero');
        for (let i = 0; i < arrNum.length; i++) {

            if (arrNum[i] == '.' | arrNum[i] == ',') {

                let partD = (arrNum.length) - i;
                this.cadParteDecimal = arrNum.splice(i + 1, partD);

                this.cadParteEntera = arrNum.splice(0, i);
                break;

            } else {
                if (i >= arrNum.length - 2) {
                    console.log('entre pq no hay parte decimal');
                    this.cadParteEntera = arrNum.slice();
                    
                    this.cadParteDecimal.push(0);
                    break;

                }




            }
        }

        console.log(this.cadParteEntera, "cadena de enteros");
        console.log(this.cadParteDecimal, "cadena de decimales");
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------


    //metodos de conversion de la parte entera de cualquier numero en base 10, a un valor equivalente en la base ingresada

    /**
     * Meodo que convierte de decimal a un valor equivalente de una base ingresada
     * 
     * @param {*} decimal 
     */
    convertirNumDecToBase(cadNumero, base) {
        let parteEntera = '';
        let parteDecimal = '';
        let resultado = '';
        let contador=0;
        //separamos la cadena
        this.separarCadPartesNumero(cadNumero);
        //convertimos la parte Entera del numero
        parteEntera = this.convertirParteEnteraDToBase(base);
        console.log(this.cadParteDecimal[0], 'estoy acá');
        for (let i = 0; i < this.cadParteDecimal.length; i++) {
            if (this.cadParteDecimal[i] != 0) {
                contador ++;
                break;
            }
            
        }
        if (contador != 0) {
          
            
            parteDecimal = this.convertirParteDecimalToBase(base);
            resultado = parteEntera+'.'+parteDecimal;
            return resultado;
        }
        
        resultado = parteEntera;
        return resultado;
    }
    /**
     * convierte la parte entera de un numero decimal a una base
     * @param {*} dividendo 
     * @param {*} divisor 
     * @param {*} base 
     * @returns 
     */
    convertirParteEnteraDToBase(base) {
        let dividendo = this.transformarArrayCadToString(this.cadParteEntera);
        dividendo = parseInt(dividendo);
        let divisor = 0;
        switch (base) {
            case EnumIdentificadores.IDENTIFICADOR_HEXADECIMALES:
                divisor = 16;
                break;
            case EnumIdentificadores.IDENTIFICADOR_OCTALES:

                divisor = 8;
                break;
            case EnumIdentificadores.IDENTIFICADOR_BINARIO:

                divisor = 2;
              
            case EnumIdentificadores.IDENTIFICADOR_DECIMALES:
                return dividendo;
                break;
            default:
               
                
                break;
        }
        let decConvertido = [];
        let numero = [];
        let cociente = 0;
        let resto = 0;
        let resultado = '';
        while (dividendo >= divisor) {
            
            cociente = Math.floor(dividendo / divisor);
            resto = dividendo % divisor;
            dividendo = cociente;
            decConvertido.push(resto);
        }
        if (dividendo < divisor) {

            switch (base) {
                case EnumIdentificadores.IDENTIFICADOR_HEXADECIMALES:

                    if (dividendo < 10) {
                        decConvertido.push(dividendo);
                    } else {



                        decConvertido.push(dividendo);
                    }
                    for (let i = 0; i < decConvertido.length; i++) {
                        let num = this.pasarEquiDecAHex(decConvertido[i]);
                        numero.push(num);

                    }
                    break;
                case EnumIdentificadores.IDENTIFICADOR_OCTALES:

                    if (dividendo < 8) {
                        decConvertido.push(dividendo);
                    }
                    numero = decConvertido.slice();

                    break;
                case EnumIdentificadores.IDENTIFICADOR_BINARIO:

                        if (dividendo < 2) {
                            decConvertido.push(dividendo);
                        }
                        numero = decConvertido.slice();
    
                    break;
            }

        }
        for (let i = 0; i < numero.length; i++) {
            resultado += numero[i];

            
        }
        resultado=this.stringInvertido(resultado);
        return resultado;
    }

    /**
     * Transforma la parte decimal del numero de base 10 en un decimal de la base correspondiente
     * @param {*} numUno 
     * @param {*} numDos 
     * @param {*} base 
     * @returns 
     */

    convertirParteDecimalToBase(base) {
        let numUno;
        let numDos;
        numUno = '0'.concat(this.transformarArrayCadToString(this.cadParteDecimal));
        numUno = parseFloat(numUno);
        
        switch (base) {
            case EnumIdentificadores.IDENTIFICADOR_HEXADECIMALES:

                numDos = 16;
                break;
            case EnumIdentificadores.IDENTIFICADOR_OCTALES:

                numDos = 8;
                break;
            case EnumIdentificadores.IDENTIFICADOR_BINARIO:
            console.log('si entre aca');
                numDos = 2;
                break;
                case EnumIdentificadores.IDENTIFICADOR_DECIMALES:
                
                return numUno;
                break;
            default:
                break;
        }
        let resultado = [];
        let resMul = 0;
        let res = '';
        for (let i = 0; i < 10; i++) {

            resMul = numUno * numDos;
            resultado.push(Math.floor(resMul));
            numUno = resMul - Math.abs(resMul);
            if (isInt(resMul)) {
                resultado.push(Math.floor(resMul));
                break;
            }
        }
        switch (base) {
            case EnumIdentificadores.IDENTIFICADOR_HEXADECIMALES:
                for (let i = 0; i < resultado.length; i++) {

                    resultado[i] = this.pasarEquiDecAHex(parseInt(resultado[i]));
                }
                break;




        }
        for (let i = 0; i < resultado.length; i++) {

            res += resultado[i];
        }
        console.log('resultado decimales', res);
        
        return res;
    }
    /**
     * Metodo para pasar los valores equivalentes de decimal a hexadecimal
     * @param {*} num 
     * @returns 
     */
    pasarEquiDecAHex(num) {


        console.log('entre a pasar el equivalente de numeros a letras: ', num);
        switch (num) {

            case 10:
                console.log("entre a switch con A");
                return 'A';
                break;
            case 11:
                console.log("entre a switch con B");
                return 'B';
                break;
            case 12:
                return 'C';
                break;
            case 13:
                return 'D';
                break;
            case 14:
                return 'E';
                break;
            case 15:
                return 'F';
                break;
            default:
                return num;


        }
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Metodos para la conversion de un numero de cualquier base a base 10
    convertirNumBaseToDec(cadNumero, base) {
        let parteEntera = '';
        let parteDecimal = '';
        let resultado = '';
        let contador =0;
        //separamos cadena
        this.separarCadPartesNumero(cadNumero);
        //convertimos la parte Entera del numero
        parteEntera = this.convertirParteEnteraBToDecimal(base);
        
        for (let i = 0; i < this.cadParteDecimal.length; i++) {
            if (this.cadParteDecimal[i] != 0) {
                contador ++;
                break;
            }
            
        }
        if (contador != 0) {
            parteDecimal=this.convertirParteDecimalBToDecimal(base);
            
            resultado = parteEntera + '.' + parteDecimal;
            resultado=parseFloat(resultado);
            return resultado;
        }
        resultado=parseInt(resultado);
        resultado = parteEntera;
        return resultado;


    }

    /**
     * Metodo que convierte la parte entera de un numero de cualquier base, a un numero decimal que corresponde a su valor
     * @param {*} base 
     * @returns 
     */
    convertirParteEnteraBToDecimal(base) {
        
        let cadena = this.cadParteEntera.slice();
        
        let baseMul = 0;
        let valor = 0;
        switch (base) {
            case EnumIdentificadores.IDENTIFICADOR_HEXADECIMALES:
                baseMul = 16;
                
                for (let i = 0; i < cadena.length; i++) {

                    cadena[i] = this.pasarEquiHexADec(cadena[i]);

                    if (cadena[i] == 'ERROR') {

                        return 'ERROR';
                    }
                }
                break;
            case EnumIdentificadores.IDENTIFICADOR_OCTALES:
                for (let i = 0; i < cadena.length; i++) {
                    if (cadena[i] == '8' | cadena[i] == '9') {

                        return 'ERROR';
                    }
                }
                baseMul = 8;
                break;
            case EnumIdentificadores.IDENTIFICADOR_BINARIO:
                for (let i = 0; i < cadena.length; i++) {
                    if (cadena[i] != '0' && cadena[i] != '1') {
                        return 'ERROR';
                    }
                }
                baseMul = 2;
                break;
            case EnumIdentificadores.IDENTIFICADOR_DECIMALES:
                
                 let comprobante;
                 comprobante=this.transformarArrayCadToString(cadena);
                
                comprobante=parseInt(comprobante);
               
                 if(isInt(comprobante)){
                     return comprobante;
                 }else{
                    return 'ERROR';
                 }
                
                
                break;
            default:
                break;
        }
        for (let i = 0; i < cadena.length; i++) {

            cadena[i] = parseInt(cadena[i]);
            if (cadena[i] == NaN) {
                return 'ERROR';
            }


            valor += cadena[Math.abs(i - (cadena.length - 1))] * Math.pow(baseMul, i);


        }
        console.log('resultado conversion:', valor);
        return valor;


    }
    /**
     * Metodo que convierte la parte decimal de cualquier numero a un numero decimal en base 10
     * @param {*} base 
     * @returns 
     */
    convertirParteDecimalBToDecimal(base) {

        let cadena = this.cadParteDecimal.slice();;
        let baseMul = 0;
        let valor = 0;
        switch (base) {
            case EnumIdentificadores.IDENTIFICADOR_HEXADECIMALES:
                baseMul = 16;
                for (let i = 0; i < cadena.length; i++) {

                    cadena[i] = this.pasarEquiHexADec(cadena[i]);

                    if (cadena[i] == 'ERROR') {

                        return 'ERROR';
                    }
                }
                break;
            case EnumIdentificadores.IDENTIFICADOR_OCTALES:
                for (let i = 0; i < cadena.length; i++) {
                    if (cadena[i] == '8' | cadena[i] == '9') {

                        return 'ERROR';
                    }
                }
                baseMul = 8;
                break;
            case EnumIdentificadores.IDENTIFICADOR_BINARIO:
                for (let i = 0; i < cadena.length; i++) {
                    if (cadena[i] != '0' && cadena[i] != '1') {
                        return 'ERROR';
                    }
                }
                baseMul = 2;
                break;
         case EnumIdentificadores.IDENTIFICADOR_DECIMALES:
            let comprobante;
            comprobante=this.transformarArrayCadToString(cadena);
           
           comprobante=parseInt(comprobante,10);
          
            if(isInt(comprobante)){
                return comprobante;
            }else{
               return 'ERROR';
            }
           
         return
        break;
            default:
                break;
        }

        for (let i = 0; i < cadena.length; i++) {

            cadena[i] = parseInt(cadena[i]);
            if (cadena[i] == NaN) {
                return 'ERROR';
            }
            console.log('parte decimal:', cadena[i], 'multiplicado por:', Math.pow(baseMul, -(i + 1)));

            valor += cadena[i] * Math.pow(baseMul, -(i + 1));


        }
        return valor;



    }

    /**
     * Metodo para pasar la parte hexadecimal a su equivalente decimal
     * @param {*} letter 
     * @returns 
     */

    pasarEquiHexADec(letter) {

        letter = letter.toUpperCase();
        console.log('entre a pasar el equivalente de letras a numeros letra: ', letter);
        switch (letter) {

            case 'A':
                console.log("entre a switch con A");
                return '10';
                break;
            case 'B':
                console.log("entre a switch con B");
                return '11';
                break;
            case 'C':
                return '12';
                break;
            case 'D':
                return '13';
                break;
            case 'E':
                return '14';
                break;
            case 'F':
                return '15';
                break;
            default:
                if (parseInt(letter) == NaN) {
                    return 'ERROR';
                } else
                    return letter;

        }
    }

}



class Calculadora {

    constructor() {


    }



    hacerOperacion(num1, num2, operador) {
        let suma = 0;
        let division = 0;
        let resta = 0;
        let multiplicacion = 0;
        switch (operador) {


            case EnumIdentificadores.IDENTIFICADOR_SUMA:

                suma = num1 + num2;
                return suma;
                break;
            case EnumIdentificadores.IDENTIFICADOR_RESTA:

                resta = num1 - num2;
                return resta;
                break;
            case EnumIdentificadores.IDENTIFICADOR_DIVISION:

                division = num1 / num2;
                return division;
                break;
            case EnumIdentificadores.IDENTIFICADOR_MULTIPLICACION:

                multiplicacion = num1 * num2;
                return multiplicacion;
                break;
        }
    }



}




class App {
    constructor() {
        this.calculadora1 = new Calculadora();
        this.conversor1 = new Conversor();
    }
    calcular(numeroUno, numeroDos, operador, baseUno, baseDos) {



        let numero1 = this.conversor1.convertirNumBaseToDec(numeroUno, baseUno);



        let numero2 = this.conversor1.convertirNumBaseToDec(numeroDos, baseDos);


        if (numero1 != 'ERROR' && numero2 != 'ERROR') {
            let resultado = this.calculadora1.hacerOperacion(numero1, numero2, operador);
            console.log('voy a retornar', resultado);
            return resultado;

        } else {
            return 'ERROR';
        }






    }
    cambiarBaseResultado(resultado, base) {
        console.log('entre a cambiar base', base);
        let res;
        res = this.conversor1.convertirNumDecToBase(resultado, base);

        return res;
    }



}

EnumIdentificadores = {

    IDENTIFICADOR_DECIMALES: 'DEC',
    IDENTIFICADOR_BINARIO: 'BIN',
    IDENTIFICADOR_OCTALES: 'OCT',
    IDENTIFICADOR_HEXADECIMALES: 'HEX',
    IDENTIFICADOR_SUMA: 'SUM',
    IDENTIFICADOR_RESTA: 'RES',
    IDENTIFICADOR_MULTIPLICACION: 'MUL',
    IDENTIFICADOR_DIVISION: 'DIV'


}
class Vista {
    constructor() {
        this.operador = EnumIdentificadores.IDENTIFICADOR_SUMA;
        this.baseUno = EnumIdentificadores.IDENTIFICADOR_DECIMALES;
        this.baseDos = EnumIdentificadores.IDENTIFICADOR_DECIMALES;
        this.app = new App();
        this.resultado = 0;
        this.resultadoVista;
    }

    mostrarResultado(id, className) {

        let num1 = document.getElementById('numeroUnoCalculadora').value;
        let num2 = document.getElementById('numeroDosCalculadora').value;
        this.resultadoVista = document.getElementById('resultado');




        this.resultado = this.app.calcular(num1, num2, this.operador, this.baseUno, this.baseDos);
        console.log('voy a mostrar', this.resultado);
        if (this.resultado == 'ERROR') {
            alert('Escribio un número incorrecto');
        } else {
            this.resultadoVista.value = this.resultado;
        }

    }
    cambiarResultado(base) {
        
        let resultadoCad;
        resultadoCad = this.app.cambiarBaseResultado((this.resultado+''), base);
        this.resultadoVista.value = resultadoCad;
        

    }

    capturarOperador(nuevoOperador) {
        console.log("operador: ", nuevoOperador)
        this.operador = nuevoOperador;

    }

    capturarBaseNumeroUno(nuevaBase) {
        console.log("base uno: ", nuevaBase)
        this.baseUno = nuevaBase;
    }
    capturarBaseNumeroDos(nuevaBase) {
        console.log("base dos: ", nuevaBase)
        this.baseDos = nuevaBase;
    }
}
let vista = new Vista();
function mostrarResultado() {
    vista.mostrarResultado();

}
function cambiarResultado(base) {

    vista.cambiarResultado(base);
}
function capturarOperador(nuevoOperador) {
    vista.capturarOperador(nuevoOperador);
}

function capturarBaseNumeroUno(nuevaBase) {
    vista.capturarBaseNumeroUno(nuevaBase);
}
function capturarBaseNumeroDos(nuevaBase) {
    vista.capturarBaseNumeroDos(nuevaBase);
}
