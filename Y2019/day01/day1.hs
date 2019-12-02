import Control.Lens

solve :: IO ()
solve =  do
  input <- readFile "./day01.txt"
  print $ input ^.. worded

  -- https://chrispenner.ca/posts/advent-of-optics-01