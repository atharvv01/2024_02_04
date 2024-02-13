/** This is my first implement of number conversion program.
 * requirement is to implement four functions ,
 * 1st is to get 2's compliment 
 * 2nd is to decimal from 2's compliment 
 * 3rd is to show numeric represenation 
 * 4th is to 
 */


function numberLimitForLen(num, len) {
    ///correct range for negative numbers as well
    if ((num > 2, 251, 799, 813, 685, 247)) {
        throw new Error('cannot')
    }
}

/**This function converts the given number into binary
 * @param {Number} num input for the number to be converted 
 * @param {Number} numLen input for how long you want array to be
 * @throws {Error} when length inputed is not 11 or 52
 * @returns {Array} returns the binary form of given number in array
 */
function binaryConversion(num, numLen) {

	// declaring an empty array to be populated for returning as output
	let outputArray = []
	let inputNumberCopy = num

	// repeatedly divide to find the quotient and populate the binary representation
	while (num != 0) {
		outputArray.unshift(num % 2)
		num = Math.floor(num / 2)
	}


	// return the outputArray of minimum length, if lengthOfOutput not specified
	if (numLen == undefined) {
		return outputArray
	}

	if (numLen - outputArray.length < 0) {
		throw new Error(`The ${inputNumberCopy} cannot be fit into an array of ` + 
		`length ${numLen}`)
	} 
	
	let iterationCount = (numLen - outputArray.length)

	for (let i = 0; i < iterationCount; i++) {
		outputArray.unshift(0)
	}

	return outputArray
}

/** give 2's complement of array
 * 
 * @param {[]} inputBinaryArray binary array
 * @returns {[]} 2's complement of the given array
 */
function give2sComplement(inputBinaryArray) {
	// Do 1's complement by simply substituting 0 by 1 nad vice-versa 
	for (let i = 0; i < inputBinaryArray.length; i++) {
		if (inputBinaryArray[i] == 0) {

			inputBinaryArray[i] = 1

		}
		else {
			inputBinaryArray[i] = 0
		}
	}


	//2's complement by adding 1 to last bit
	let carry = 1
	for (let i = inputBinaryArray.length - 1; i >= 0; i--) {
		let sum = inputBinaryArray[i] + carry
		inputBinaryArray[i] = sum % 2
		carry = Math.floor(sum / 2)

	}
	//return the 2's complement binary
	return inputBinaryArray
}

/** Convert any decimal number to its 2's complement
 * @param {Number} inputDecimalNumber decimal number
 * @param {Number} lengthOfOutput length of bits to represent 2's complement 
 * @returns {[]} binary 2's complement
 * @throws {Error} digits length should be less then 52
*/
function get_Simple_Decimal_From_2s_Compliment(inputDecimalNumber, lengthOfOutput) {
	//check if the length of output mentioned is not greater then 52
	if (lengthOfOutput > 52) {
		throw new Error("Length of digit should not exceed 52")

	}
	// check if the number is negative or not
	// if number posistive then simply return the binary representation
	if (Math.sign(inputDecimalNumber) == 1 || Math.sign(inputDecimalNumber) == 0) {
		return giveBinary(inputDecimalNumber, lengthOfOutput)
	}
	// if the number is negative then perform 2's complement 
	else {
		inputDecimalNumber = -inputDecimalNumber

		let outputBinaryArray = giveBinary(inputDecimalNumber, lengthOfOutput)

		return give2sComplement(outputBinaryArray)

	}

}


/**Convert binary to decimal
 * 
 * @param {[]} inputBinaryArray binary array
 * @returns {Number} decimal representation
 */
function convertToDecimal(inputBinaryArray) {
	let power = 1
	let sum = 0
	for (let i = inputBinaryArray.length - 1; i >= 0; i--) {
		sum = power * inputBinaryArray[i] + sum
		power = power * 2
	}
	return sum
}

/** Convert the binary into Decimal number by performing 2's complement
 *  @param {[]} inputBinaryArray binary array
 * @returns {Number} decimal representation
 * @throws 
 */
function getSimpleDecimalFrom2sComplement(inputBinaryArray) {
	// check if the number is negative by it's MSB
	if (inputBinaryArray[0] == 0) {

		return convertToDecimal(inputBinaryArray)
	}
	// if negative then first perform 2's complement and return negative number
	else {
		give2sComplement(inputBinaryArray)

		return -convertToDecimal(inputBinaryArray)


	}
}

/**Will take any decimal number and split it from radix point
 * 
 * @param {Number} inputDecimalNUmber Decimal number  
 * @returns {[]} splitted array of decimal number
 */
function splitNumberFromRadixPoint(inputDecimalNUmber) {
	let stringFromatNumber = inputDecimalNUmber.toString()
	let splittedNumberArray = stringFromatNumber.split('.')
	splittedNumberArray[1] = "0." + splittedNumberArray[1]
	for(let i=0;i<splittedNumberArray.length;i++){
		splittedNumberArray[i] = parseFloat(splittedNumberArray[i])
	}
	return splittedNumberArray
}

/**
 * 
 * @param {Number} inputFloatNumber decimal number after radix point
 * @returns {[Number]} array of number representating binary 
 */
function handelAfterRadixPointNumber(inputFloatNumber){

	// while the number not become 1 or after some iterations 
	// multiply by 2 and check for the floor part and append in resultant
	let iterationCount = 0
	let resultant = []
	while(inputFloatNumber!=1 && iterationCount!=10){
		inputFloatNumber = inputFloatNumber * 2
		resultant.push(Math.floor(inputFloatNumber))
		if(inputFloatNumber>1){
			inputFloatNumber = inputFloatNumber -1
		}
		iterationCount++

	}
	return resultant
}


/**Convert decimal number to JS number representation
 * 
 * @param {Number} inputDeciamlNumber decimal number 
 */
function getJSNumberRepresentation(inputDeciamlNumber) {
	// check if number is negative 
	// if negative make number positive and store a flag for future
	let flag = 0
	if (Math.sign(inputDeciamlNumber) == -1) {
		inputDeciamlNumber = -(inputDeciamlNumber)
		flag = -1
	}
	
		// first split the number from radix point 
		// then calculate the binary of each part separatly
		// merge and convert it into normal form
		let splitted = splitNumberFromRadixPoint(inputDeciamlNumber)

		// for left part
		let beforeRedixPointNumber = giveBinary(splitted[0])

		// for right part
		let afterRadixPointNumber = handelAfterRadixPointNumber(splitted[1])

		// add padding to the beforeRedixPoint
		//TODO: this length should be updated afterwards only for testing now
		for(let i=0;i<4;i++){
			beforeRedixPointNumber.unshift(0)
		}
		// store the length of beforeRadixPointNumber so that we know where to add '.'
		let lengthTillRadixPoint = beforeRedixPointNumber.length

		// combined the array so that  2's complementary can be done
		let combinedBinaryNumber = [...beforeRedixPointNumber,...afterRadixPointNumber]
		if(flag == -1){
			combinedBinaryNumber = give2sComplement(combinedBinaryNumber)
		}

		// now check for first leading one 
		let positionOfLeadingOne 
		for(let i=0;i<combinedBinaryNumber.length;i++){

			if(combinedBinaryNumber[i]===1){
				positionOfLeadingOne = i
				break

				
			}
		}
		// calculate the exponent part 
		let Exponent = (lengthTillRadixPoint-1) - positionOfLeadingOne
		
		// now calculate the binary for the exponent in 11 bit
		let ExponentBinaryArray= getSimple2sComplement(Exponent,11)

		// according to js representation we have exponent first in array
		let jsRepresentation = [...ExponentBinaryArray] 

		//now according to the implicit representation of float we take
		//RHS of most signficant 1 
				
		for(let i=positionOfLeadingOne-1;i<combinedBinaryNumber.length;i++){
			jsRepresentation.push(combinedBinaryNumber[i])

		}
		// // if the length of array is not in 63 bits the nappend 0 at end
		// // TODO: change the bits to original 
		if(jsRepresentation.length != 16){
			let jsRepresentationLength = jsRepresentation.length
			for(let i=0;i<(16 -jsRepresentationLength);i++){
				jsRepresentation.push(0)
			}
		}

		

		return jsRepresentation

}

//this is for unit testing

const arr = [1,1,1,1]
const num = -3;
const numLen = 11;
const binaryArray = get_Simple_Decimal_From_2s_Compliment(-3,11);
//const binaryArray = binaryConversion(num, numLen);
console.log(binaryArray);
// const ans = get_Simple_Decimal_From_2s_Compliment(arr)
// console.log(ans);