package util

import (
	"io/ioutil"
	"strconv"
	"strings"
)

func StrListToInt(strs []string) []int {
	nums := []int{}
	for _, v := range strs {
		v, _ := strconv.Atoi(v)
		nums = append(nums, v)
	}

	return nums
}

func ReadLines(inputPath string) []string {
	input, err := ioutil.ReadFile(inputPath)
	if err != nil {
		panic("File not found")
	}

	inputSplit := strings.Split(string(input), "\n")
	return inputSplit
}

func ReadNumbers(inputPath string) []int {
	input, err := ioutil.ReadFile(inputPath)
	if err != nil {
		panic("File not found")
	}

	inputSplit := strings.Split(string(input), "\n")
	return StrListToInt(inputSplit)
}

func CheckErr(err error) {
	if err != nil {
		panic(err)
	}
}
