package main

import (
	"aoc-2021/util"
	"fmt"
	"io/ioutil"
	"path"
	"regexp"
	"strings"
)

func partOne(lines []string) int {
	return 0
}

func partTwo(lines []string) int {
	return 0
}

func main() {
	file, err := ioutil.ReadFile(path.Join("04", "input.txt"))
	util.CheckErr(err)

	parsed := strings.Split(string(file), "\n\n")
	// numbers := parsed[0]
	boards := parsed[1:]
	parsedBords := [][]string{}
	re := regexp.MustCompile("\\s+")
	for _, board := range boards {
		re.Split(board)
	}

	fmt.Println(len(boards[0]))

	fmt.Println(len(parsed))

	// fmt.Println(partOne(lines))
	// fmt.Println(partTwo(lines))
}
