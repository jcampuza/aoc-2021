package main

import (
	"aoc-2021/util"
	"fmt"
	"path"
	"strconv"
	"strings"
)

func partOne(lines []string) int {
	hor := 0
	ver := 0

	for _, v := range lines {
		split := strings.Split(v, " ")
		dir := split[0]
		value, _ := strconv.Atoi(split[1])

		switch dir {
		case "forward":
			hor += value
		case "down":
			ver += value
		case "up":
			ver -= value
		}
	}

	return hor * ver
}

func partTwo(lines []string) int {
	hor := 0
	ver := 0
	aim := 0

	for _, v := range lines {
		split := strings.Split(v, " ")
		dir := split[0]
		value, _ := strconv.Atoi(split[1])

		switch dir {
		case "forward":
			hor += value
			ver += value * aim
		case "down":
			aim += value
		case "up":
			aim -= value
		}
	}

	return hor * ver
}

func main() {
	lines := util.ReadLines(path.Join("02", "input.txt"))

	fmt.Println(partOne(lines))
	fmt.Println(partTwo(lines))
}
