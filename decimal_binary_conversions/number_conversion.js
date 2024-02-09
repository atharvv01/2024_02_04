/** This is my first implement of number conversion program.
 * requirement is to implement four functions ,
 * 1st is to get 2's compliment 
 * 2nd is to decimal from 2's compliment 
 * 3rd is to show numeric represenation 
 * 4th is to 
 */

/**This function converts the given number into binary
 * @param {Number} num input for the number to be converted 
 * @param {Number} numLen input for how long you want array to be
 * @throws {Error} when length inputed is not 11 or 52
 * @returns {Array} returns the binary form of given number in array
 */

function numberLimitForLen(num,len)
{
    ///correct range for negative numbers as well
    if((num >2,251,799,813,685,247))
    {
        throw new Error('cannot')
    }
}
/**THIS FUNCTION IS ONLY READY FOR INT NUMBERS , STILL HAVE TO WRITE IT FOR FLOAT NOS */
function binaryConversion(num, numLen) 
{
    let myArray = [];
    if (numLen === 52 || numLen === 11) {
        if (num >= 0) 
        {
            let value = num
            while (num != 0) {
                let rem = num % 2
                num = Math.floor(num / 2)
                myArray.unshift(rem)
            }
            let n = numLen - myArray.length
            while (n) {
                myArray.unshift(0)
                n--;
            }
        }
        else
        {
            let value = num*(-1)
            while (value != 0) 
            {
                let rem = value % 2
                value = Math.floor(value / 2)
                myArray.unshift(rem)
            }
            let n = numLen - myArray.length
            for (let i = myArray.length - 1; i >= 0; i--)
            {
                //first we flip all the bits
                if(myArray[i] === 0)
                {
                    myArray[i] =1
                }
                else
                {
                    myArray[i] = 0
                }
            } 
            while (n) {
                myArray.unshift(0)
                n--;
            }
            myArray[0] = 1

        }
    }
    //throws error
    else 
    {
        throw new Error('Representation length invalid')
    }

    return myArray;
}

/**This function returns a array with 2's compliment binary format of given number 
 * @param {Number} num input for the number to be converted 
 * @param {Number} numLen input for how long you want array to be 
 */
function get_Simple_2s_Compliment(num, numLen) {
    
    let binaryArray = binaryConversion(num, numLen);
    
    if (binaryArray[0] === 0) 
    {
        return binaryArray;
    } 
    else 
    {
        let carry = 1; // Initialize the carry to 1
        for (let i = binaryArray.length - 1; i >= 0; i--) 
        {
            let sum = binaryArray[i] + carry;
            binaryArray[i] = sum % 2;
            carry = Math.floor(sum / 2);
        }
    }
    return binaryArray;
}

function get_Simple_Decimal_From_2s_Compliment()
{

}

//this is for unit testing

const num = -54;
const numLen = 11;
const binaryArray = get_Simple_2s_Compliment(num, numLen);
//const binaryArray = binaryConversion(num, numLen);
console.log(binaryArray);