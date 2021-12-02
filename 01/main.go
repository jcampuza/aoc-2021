package main

import (
	"aoc-2021/util"
	"fmt"
	"path"
)

func partOne(nums []int) int {
	increases := 0
	prev := nums[0]

	for _, v := range nums[1:] {
		if v > prev {
			increases++
		}
		prev = v
	}

	return increases
}

func partTwo(nums []int) int {
	increases := 0

	sum := func(nums []int) int {
		res := 0
		for _, v := range nums {
			res += v
		}

		return res
	}

	for i := range nums[:len(nums)-3] {
		curr := nums[i : i+3]
		next := nums[i+1 : i+4]

		if sum(next) > sum(curr) {
			increases++
		}
	}

	return increases
}

func main() {
	nums := util.ReadNumbers(path.Join("01", "input.txt"))

	fmt.Println(partOne(nums))
	fmt.Println(partTwo(nums))
}
