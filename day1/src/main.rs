use std::{fs, io::Result};

const NUMERALS: [&'static str; 9] = [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];
pub fn replace_numerals(mut s: String) -> String {
    for mut i in 0..s.len() {
        for (nn, n) in NUMERALS.iter().enumerate() {
            if i + n.len() > s.len() {
                continue;
            }
            let candidate = &s.chars().collect::<Vec<_>>()[i..i + n.len()].iter().fold(
                String::new(),
                |mut acc, v| {
                    acc.push(*v);
                    acc
                },
            );
            if candidate == n {
                s.replace_range(i..i+1, (nn + 1).to_string().as_str());
                // s = s.replace(n, (nn + 1).to_string().as_str());
            }
        }
    }
    return s;
}
fn main() -> Result<()> {
    let r: i32 = fs::read_to_string("a.txt")?
        .lines()
        .map(|s| {
            dbg!(s);
            let s = replace_numerals(s.to_string());
            dbg!(&s);
            let number_chars: Vec<char> = s.chars().filter(|c| c.is_numeric()).collect();
            let mut x = number_chars.first().unwrap().to_string();
            x.push(*number_chars.last().unwrap());
            dbg!(&x);
            return x;
        })
        .map(|c| c.parse::<i32>().unwrap())
        .sum();
    println!("{}", r);

    Ok(())
}
