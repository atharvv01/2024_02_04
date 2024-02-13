/* My Class-based implementation of an infinite precision Integer. */

class InfiniteNumber {

    /** An internal member Array to contain the digits of the Infinite Integer.
     * @private
     * @type {Array<Number>}
     */
    _internalArray = []

    constructor(inputObject) {

        if (typeof inputObject === "number") {
            if (inputObject === NaN) {
                return new Error("Not a valid number")
            }
            if (inputObject % 1 != 0) {
                return new Error("Only integers are allowed")
            }
            else if (inputObject < 0) {
                return new Error("Cannot handel negative data")
            }
            let tempArray = []
            if (inputObject == 0) {
                tempArray = [0]
            }
            else {
                while (inputObject != 0) {
                    tempArray.unshift((inputObject % 10))
                    inputObject = inputObject / 10
                }
            }

            // deep copy 
            // initialize the member array
            this._internalArray = [...tempArray]


        } else if (typeof inputObject === "string") {
            // console.log("You sent a String")

            // TODO validate the String and only then initialize the _internalArray
            let tempArray = []

            let numberPattern = /^[0-9]+$/
            if (numberPattern.test(inputObject) == false) {
                return new Error("Value other then integer are not allowed")
            }
            if ((parseFloat(inputObject)) % 1 != 0) {
                return new Error("Only integer are allowed")
            }
            else {
                if (parseInt(inputObject) == 0) {
                    tempArray = [0]
                }
                else {
                    inputObject = parseInt(inputObject)

                    while (inputObject != 0) {
                        tempArray.push((inputObject % 10))
                        inputObject = inputObject / 10
                    }
                }
            }


            // initialize the member array
            this._internalArray = [...tempArray]




        } else if (typeof inputObject === "object") {
            if (Array.isArray(inputObject)) {
                for (let i = 0; i < inputObject.length; i++) {
                    if (typeof inputObject[i] != 'number') {
                        return new Error("Only number in array are allowed")

                    }


                    else if (inputObject[i] % 1 != 0) {
                        return new Error("Only integers array are allowed")
                    }
                    else if (inputObject[i] < 0) {
                        return new Error("Only positive integers are allowed")
                    }

                }
                this._internalArray = [...inputObject]
            }
            else {
                if (inputObject == null) {
                    return new Error("Null passed")
                }
                let tempArray = []
                for (const key in inputObject) {
                    if (Object.hasOwnProperty.call(object, key)) {
                        const element = object[key];
                        if (typeof element != 'number') {
                            return new Error("Only number in array are allowed")
                        }
                        else if (element % 1 != 0) {
                            return new Error("Only integers array are allowed")
                        }
                        else if (element < 0) {
                            return new Error("Only positive integers are allowed")
                        }
                        tempArray.unshift(element)

                    }
                }
                this._internalArray = [...tempArray]
            }



            // TODO check if this object has getInternalArray() and make a deep copy
            // and assign it to local _internalArray




        } else {


            throw new Error(`Constuctor of IniniteNumber does not support this data`
                + ` type ${typeof inputObject}`)
        }

    }

    /** Helper method to return the _internalArray variable which contains the
     * Inifnite precision Integer.
     * @returns {Array<Number>} the internal array representing individual digits
     */
    getInternalArray() {
        return this._internalArray
    }

    /** Helper method to return the representation of this Infinite Precision
    * @param {number[]} arrayToString the array to convert to string
    * @returns {String} the result in the form of a string
    */
    getNumberAsString() {
        // TODO, concatenate the contents of _internalArray to a string and return
        return this.getInternalArray().join('')

    }

    /**This function finds out bigger array from given two arrays
    * @param {Array} arr1 first array
    * @param {Array} arr2 second array
    * @returns {True} if array2 is greater than array 1  
    */
    findBiggerArray(arr1, arr2) {
        /**First we check weather length of array 2 is bigger if so return 2 */
        if (arr2.length > arr1.length) {
            return true
        }

        /**Then we will check if the first index of array2 is bigger */
        else if (arr2[0] > arr1[0]) {
            return true
        }
        /**Even if the first index is same then we will run a for loop from
         * 2nd index to last index to check all the indexes of both arrays
         * if at any given index we find array2 is greater we return true else 
         * even after loop is over we dont find any greater number means array1
         * is greater so return false
         */
        for (let i = 1; i < arr2.length; i++) {
            if (arr2[i] > arr1[i]) {
                return true
            }
        }
        return false
    }

    /**This function removes all preceeding zeros from array
    * @param {Array} arr arr from which precceding zeros to be removed
    * @returns {Array} returns array with all preceeding zeros removed
    */
    removePreceedingZeros(arr) {
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
    * @param {InfiniteNumber} infiniteNumber a infinite number type of data
	* @returns {InfiniteNumber} resultant infinite number after addition
    */
    addTwoNos(InfiniteNumberInput) {
        let arr1 = this.getInternalArray()
        let arr2 = InfiniteNumberInput.getInternalArray()

        //declaring some varilables 
        let ansArr = []
        let sum = 0
        let carry = 0; // to keep track of carry



        for (let i = arr1.length - 1; i >= 0; i--) {

            carry = arr1[i] + arr2[i] + carry
            sum = carry % 10 // this makes sure the units part of the carry is pushed into array
            carry = Math.floor(carry / 10) // while carry is updated 
            ansArr[i] = sum;
        }

        if (carry != 0) {
            ansArr.unshift(carry)
        }

        let resultant = new InfiniteNumber(ansArr)
        return resultant
    }

    /**This functions substracts two numbers
     * @param {InfiniteNumber} infiniteNumber a infinite number type of data
	* @returns {InfiniteNumber} resultant infinite number after substraction
    */
    subTwoNos(InfiniteNumberInput) {

        let arr1 = this.getInternalArray()
        let arr2 = InfiniteNumberInput.getInternalArray()


        //declaring some varilables 
        let ansArr = []
        let borrow = 0; // to keep track of borrow



        /**This condition checks if any array is zero in numeric value
         * if there it calls a function that removes all preceding zeros
         */
        if (arr1[0] === 0 || arr2[0] === 0) {
            arr1 = this.removePreceedingZeros(arr1)
            arr2 = this.removePreceedingZeros(arr2)
        }

        /**This condition checks for bigger array and throws error if
         * num2 is bigger than num1
         */

        if (this.findBiggerArray(arr1, arr2)) {
            throw new Error("input 2 is bigger than input 1")
        }
        for (let i = arr1.length - 1; i >= 0; i--) {
            if ((arr1[i] - borrow) < arr2[i]) {
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
                    arr1[i] = arr1[i] - borrow
                    ansArr[i] = arr1[i] - arr2[i]
                    borrow--
                } else {
                    ansArr[i] = arr1[i] - arr2[i]
                }
            }
        }

        let i = 0
        while (ansArr[0] == 0) {
            ansArr.shift()
            i++
        }
        let resultant = ne
    }

    /**This function multiplies two numbers 
    * @param {InfiniteNumber} infiniteNumber a infinite number type of data
	* @returns {InfiniteNumber} resultant infinite number after multiplicaation
    */
    mulTwoNos(InfiniteNumberInput) {

        let arr1 = this.getInternalArray()
        let arr2 = InfiniteNumberInput.getInternalArray()
        let resultant = new InfiniteNumber(arr1)

        /**This condition checks if any array is zero in numeric value
         * if there it calls a function that removes all preceding zeros
         */
        if (arr1[0] === 0 || arr2[0] === 0) {
            arr1 = this.removePreceedingZeros(arr1)
            arr2 = this.removePreceedingZeros(arr2)
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
            resultant = this.addTwoNos(resultant)
        }
        return resultant
    }

     /**This function divides two numbers 
    * @param {InfiniteNumber} infiniteNumber a infinite number type of data
	* @returns {InfiniteNumber} resultant infinite number after division
    */
    divTwoNos(InfiniteNumberInput){
        let arr1 = this.getInternalArray()
		let arr2 = InfiniteNumberInput.getInternalArray()

		//we will perform division by repeted subtraction
		// declare a variable for that
		let divCounter = 0
		let resultant_No = new InfiniteNumber(this._internalArray)
	
		while(!this.findBiggerArray(arr1,arr2)){

			resultant_No = resultant_No.subTwoNos(infiniteNumber)
			divCounter++

		}
		// again make this as an array
		let resultant = []
		while(divCounter!=0){
			resultant.unshift(divCounter%10)
			divCounter = Math.floor(divCounter/10)
		}
        console.log(resultant)
		// let resultInfiniteNumber = new InfiniteNumber(resultant)
		// return resultInfiniteNumber
	}

}


/**This is for unit testing to check the sanity of the code */

function unityTesting() {
    let arr1 = new InfiniteNumber([1,2])
    let arr2 = new InfiniteNumber([5])
    let result = arr1.mulTwoNos(arr2)
    console.log(result.getNumberAsString());


    let arr3 = new InfiniteNumber([1,2])
    let arr4 = new InfiniteNumber([6])
    // let resultDiv = arr3.divTwoNos(arr4)
    // console.log(resultDiv);
    // console.log(resultDiv.getNumberAsString());

}

unityTesting()