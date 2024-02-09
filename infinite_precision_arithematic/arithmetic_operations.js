/**This is my attempt to solve arithmetic operations using javascript
 * @author Atharva
 */


/**This function finds out bigger array from given two arrays
 * @param {Array} arr1 first array
 * @param {Array} arr2 second array
 * @returns {True} if array2 is greater than array 1  
 */
function findBiggerArray(arr1,arr2)
{
	/**First we check weather length of array 2 is bigger if so return 2 */
	if(arr2.length>arr1.length)
	{
		return true
	}

	/**Then we will check if the first index of array2 is bigger */
	else if(arr2[0]>arr1[0])
	{
		return true
	}
	/**Even if the first index is same then we will run a for loop from
	 * 2nd index to last index to check all the indexes of both arrays
	 * if at any given index we find array2 is greater we return true else 
	 * even after loop is over we dont find any greater number means array1
	 * is greater so return false
	 */
	for(let i =1;i<arr2.length;i++)
	{
		if(arr2[i]>arr1[i])
		{
			return true
		}
	}
	return false
}

/**This function checks if given array has data as integer only
 * and no other data is inputed and also data is single digit number
 * @param {Array} arr which data is to be checked
 * @param {Number} arrLen length of array
 * @returns {Boolean} returns true or false based on data
 */
function checkInputDataType(arr, arrLen) {
	for (let i = 0; i < arrLen; i++) {
		//here as soon as it counters one non integer value or  it returns false
		if (!Number.isInteger(arr[i]) || arr[i] > 10 || arr.length === 0) {
			return false
		}
	}
	return true
}

/**This function removes all preceeding zeros from array
 * @param {Array} arr arr from which precceding zeros to be removed
 * @returns {Array} returns array with all preceeding zeros removed
 */
function removePreceedingZeros(arr) {
	let j = 0
	/** Here a while loop runs till the first element of array=0
	 * while condition is true we use array.shift to pop of first element of
	 * array which is zero
	 * This way we keep removing first element of array till its zero
	 */
	while (arr[0] == 0) {
		arr.shift()
		j++
	}
	return arr
}

/**This functions adds two numbers
 * @param {Array} arr1 first number to be added
 * @param {Array} arr2 second number to be added
 * @returns {Array} answer of the addition of two arrays 
 * @throws {Error} throws error if inputed array doesnt have a single digit 
 * positive integer value
 */
function addTwoNos(arr1, arr2) {
	//declaring some varilables 
	let ansArr = []
	let diff // to find out the bigger array
	let sum = 0
	let carry = 0; // to keep track of carry

	//this if checks wether both arrays have values none other than single digit integer 
	if (checkInputDataType(arr1, arr1.length) && checkInputDataType(arr2, arr2.length)) {
		/**This is to check which array us bigger and append zeros to the 
		 * remaining index of smaller array
		 */
		if (arr1.length > arr2.length) {
			diff = arr1.length - arr2.length
			while (diff != 0) {
				arr2.unshift(0)
				diff--
			}

		} else {
			diff = arr2.length - arr1.length
			while (diff != 0) {
				arr1.unshift(0)
				diff--
			}

		}

		for (let i = arr1.length - 1; i >= 0; i--) {

			carry = arr1[i] + arr2[i] + carry
			sum = carry % 10 // this makes sure the units part of the carry is pushed into array
			carry = Math.floor(carry / 10) // while carry is updated 
			ansArr[i] = sum;
		}

		if (carry != 0) {
			ansArr.unshift(carry)
		}
		return ansArr
	} else {
		throw new Error('Array data is not a single digit integer number')
	}
}

/**This function does the substraction for non positive numbers
 * @param {Array} arr1 first number for substraction
 * @param {Array} arr2 second number for substraction
 * @returns {Array} returns the solution in form of array
 */
function subNonPostiveNos(arr1, arr2) {

	/**This is when both the arrays are empty
	 * it returns zero
	 */
	if (arr1 == 0 && arr2 == 0) {
		return 0
	}

	/**Below conditions are when one of the array is empty in that 
	 * case the other array is returned since anything - zero
	 * is zero
	 */
	if (arr1 == 0 && arr2 != 0) {
		return arr2
	}
	if (arr2 == 0 && arr1 != 0) {
		return arr1
	}

	/**This condition checks if any array is zero in numeric value
	 * if there it calls a function that removes all preceding zeros
	 */
	if (arr1[0] === 0 || arr2[0] === 0) {
		arr1 = removePreceedingZeros(arr1)
		arr2 = removePreceedingZeros(arr2)
	}

	/**This Condition checks if both the inputs are less tha zero 
	 * if so it adds both of then keeping the negative sign
	 */
	if (arr1[0] < 0 && arr2[0] < 0) {

		//here it is first converted to positive numbers to carry out simple addtion 
		arr1[0] = arr1[0] * (-1)
		arr2[0] = arr2[0] * (-1)
		//we will check amongst both array which is numerically bigger
		if ((arr1.length == 0 && arr2.length == 0) && arr1[0] > arr2[0] || arr1.length > arr2.length) {
			ansArr = subTwoNos(arr1, arr2)
			ansArr[0] = ansArr[0] * (-1)
			return ansArr
		} else {
			ansArr = subTwoNos(arr2, arr1)
			return ansArr
		}

	}

	/**This checks and executes when one of the array is less than zero */
	if (arr1[0] < 0 || arr2[0] < 0) {

		/**If thats a second array thats negative then minus minus would 
		 * be plus so we will carry out simple addition and give it a
		 * minus sign 
		 * But first we will convert that to postive number for addition 
		 * and then multiply the ans by -1
		 */
		if (arr2[0] < 0) {
			arr2[0] = arr2[0] * (-1)
			ansArr = addTwoNos(arr1, arr2)
			return ansArr
		}
		/**If thats a first array thats negative then we have to perform
		 * substraction and give the sign of greater number
		 */
		if (arr1[0] < 0) {
			//here it is first converted to positive numbers to carry out simple addtion 
			arr1[0] = arr1[0] * (-1)

			ansArr = addTwoNos(arr1, arr2) // calling add function

			//then added output is multipled by -1 to keep negative sign
			ansArr[0] = ansArr[0] * (-1)

			return ansArr
		}
	}
}

/**This functions substracts two numbers
 * @param {Array} arr1 first number to be substracted
 * @param {Array} arr2 second number to be substracted
 * @returns {Array} answer of the substraction of two arrays 
 * @throws {Error} throws error if inputed array doesnt have a single digit 
 * positive integer value 
 */
function subTwoNos(arr1, arr2) {

	if (checkInputDataType(arr1, arr1.length) && checkInputDataType(arr2, arr2.length)) {
		//declaring some varilables 
		let ansArr = []
		let sub = 0
		let diff // to find out the bigger array
		let borrow = 0; // to keep track of borrow
		let flag = 0; // to keep track of number being positive or negative
		let max;

		/**This condition checks if any array is zero in numeric value
		 * if there it calls a function that removes all preceding zeros
		 */
		if (arr1[0] === 0 || arr2[0] === 0) {
			arr1 = removePreceedingZeros(arr1)
			arr2 = removePreceedingZeros(arr2)
		}

		/**This condition checks if any of given array is negative number
		 * if true it calls another function that deals with non positive
		 * numbers
		 */
		if (arr1[0] < 0 || arr2[0] < 0) {
			ansArr = subNonPostiveNos(arr1, arr2)
		} else {
			/**
			 * this if condition checks if array 2 is larger and marks a flag to 1 if true 
			 */
			if (findBiggerArray(arr1,arr2)) {
				[arr1, arr2] = [arr2, arr1];
				flag = 1

			}
			/**while smaller array is appeneded with zeros to match the length of bigger array */
			diff = arr1.length - arr2.length
			while (diff != 0) {
				arr2.unshift(0)

				diff--
			}
			for (let i = arr1.length - 1; i >= 0; i--) {
				if ((arr1[i]-borrow) < arr2[i]) {
					/**Enters this condition when you need to borrow i.e when value
					 * of upper digit is lower than that of lower digit 
					 */
					if (borrow) {
						/**Enters this condition when there exists a borrow meanwhile
						 * upper digit is lower than that of lower
						 */
						arr1[i] = arr1[i] + 10 - borrow
						ansArr[i] = arr1[i] - arr2[i]

					} else {
						/**Enters this condition when upper digit is 
						 * lower than that of lower but there is no
						 * borrow
						 */
						arr1[i] = arr1[i] + 10
						ansArr[i] = arr1[i] - arr2[i]
						/**Here since even if there exists no borrow because
						 * arr1 value is lower than arr2 this will generate a borrow
						 */
						borrow++;
					}
				} else {
					/**Enters this condition when you need not to borrow i.e when value
					 * of upper digit is greater than that of lower digit but there is no borrow
					 */
					if (borrow) {
						arr1[i] = arr1[i]- borrow
						ansArr[i] = arr1[i] - arr2[i]
						borrow--
					} else {
						ansArr[i] = arr1[i] - arr2[i]
					}
				}
			}
			/** When number is negative
			 * here we do the substraction from bigger number only but then 
			 * multiply it with (-1) so that we get a negative output
			 */
			if (flag == 1) {
				/** This loop will remove all the zeros before a non zero
				 * number which donot hold any value
				 */
				let i = 0
				while (ansArr[0] == 0) {
					ansArr.shift()
					i++
				}
				/** Now since flag =1 means number is negative so we will multiply
				 * it with -1
				 */
				ansArr[0] = ansArr[0] * (-1)

			} else {
				let i = 0
				while (ansArr[0] == 0) {
					ansArr.shift()
					i++
				}

			}

		}
		return ansArr
	} else {
		throw new Error('Array data is not a single digit integer number')
	}
}

/**This function multiplies two numbers 
 * @param {Array} arr1 first number to be added
 * @param {Array} arr2 second number to be added
 * @returns {Array} answer of the multiplication of two arrays 
 * @throws {Error} throws error if inputed array doesnt have a single digit 
 * positive integer value
 */
function mulTwoNos(arr1, arr2) {

	let sum = arr1;
	let flag = 0

	if (checkInputDataType(arr1, arr1.length) && checkInputDataType(arr2, arr2.length)) {
		/** if any of the data is zero is returns zero since anything multiplied by
		zero is zero */
		if (arr1 == 0 || arr2 == 0) {
			return 0
		}

		/**This condition checks if any array is zero in numeric value
		 * if there it calls a function that removes all preceding zeros
		 */
		if (arr1[0] === 0 || arr2[0] === 0) {
			arr1 = removePreceedingZeros(arr1)
			arr2 = removePreceedingZeros(arr2)
		}

		/**If both arrays are negative then answer is positive since minus 
		 * multiplied by minus is positive
		 * so we convert both numbers into positive by multuplying them
		 * by -1  */
		if (arr1[0] < 0 && arr2[0] < 0) {
			arr1[0] = arr1[0] * (-1)
			arr2[0] = arr2[0] * (-1)
		}
		/** If any one of 2 arrays is negative then a minus sign will 
		 * be associate with product 
		 * so we initiate flag to 1 so that after multiplication we can convert
		 * product negative
		 */
		if (arr2[0] < 0) {

			/**Here we first convert it into positive value of easy of multiplication  */
			arr2[0] = arr2[0] * (-1)
			flag = 1
		}
		if (arr1[0] < 0) {
			/**Here we first convert it into positive value of easy of multiplication  */
			arr1[0] = arr1[0] * (-1)
			flag = 1
		}

		/** Here the approach is to add one of the array about second arrays numeric 
		*value time i.e rather than multiplying 2x3 we can add 2 3 times  
		*so we will be converting one of the array to integer so that we can use 
		*it as a limit to run for loop  */
		const n = parseInt(arr2.join(''))

		for (let i = 1; i < n; i++) {
			/**Here we call the addTwoNos function which adds given to numbers while 
			 * updating the prev added number to sum and also passing sum as one 
			 * parameter and number as other
			 */
			sum = addTwoNos(sum, arr1)
		}

		if (flag == 1) {
			sum[0] = sum[0] * (-1)
		}
	} else {
		throw new Error('Array data is not a single digit integer number')
	}
	return sum
}

/**This function divides two numbers
 * @param {Array} arr1 first number is to be divided
 * @param {Array} arr2 second number is divisor
 * @returns {Array} answer of the division of two arrays 
 * @throws {Error} throws error if inputed array doesnt have a single digit 
 * positive integer value
 */
function divTwoNos(arr1,arr2){
	//LOGIC TO BE WRITTEN 
}

/**This is a unit test cased used to check the sainity of the program
 * @author Atharva
 */
function testFunction1() {
	let variable1 = [1, 0, 0, 0, 0, 0, 0, 0]
	let variable2 = [1]

	const ans1 = subTwoNos(variable1, variable2)
	console.log("variable 1 = 1000000 and variable 2 = 1 and ans = " + ans1)
}

function testFunction2() {
	let variable1 = [1,4]
	let variable2 = [1]

	const ans1 = subTwoNos(variable1, variable2)
	console.log("variable 1 = "+variable1+ "\nvariable 2 = "+variable2+ "\nans = " + ans1)
}

//testFunction1()
testFunction2()