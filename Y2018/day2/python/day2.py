import itertools
print(*[''.join(a for a,b in zip(this,that) if a == b) for this,that in combinations(open('inp', 'r').readlines(),2) if len([a for a,b in zip(this,that) if a != b]) == 1])


