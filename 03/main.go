package main

import (
	"aoc-2021/util"
	"fmt"
	"path"
)

func partOne(lines []string) int {
	len := len(lines[0])
	
	oxygen := copy(lines)
	for (i := 0; i < len; i++) {
	 zeros := 0
	 ones := 0

	 for _, line := range lines {
		 line[i] === '1' ? ones++ : zeros++
	 }
	}
	
	return 0

}

func partTwo(lines []string) int {
	return 0
}

func main() {
	lines := util.ReadLines(path.Join("02", "input.txt"))

	fmt.Println(partOne(lines))
	fmt.Println(partTwo(lines))
}
