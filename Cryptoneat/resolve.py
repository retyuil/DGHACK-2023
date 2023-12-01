import base64
from pwn import xor

a = "dQsBGjy+uKhZ7z3+zPhswKWQHMYJpz7wffAe4Es/bwrJmMo99Kv7XJ8P63TbN/8XvvLH8F1NwLyPnJ4q044jQ9+z"
a = base64.b64decode(a)

b = "C19FW3jqqqxd6G/z0fcpnOSIBsUSvD+jZ7E9/VkscwDMrdk9i9efIvJw1Fj6Fs0R"
b = base64.b64decode(b)

clear = "Build with love, kitties and flowers"

def pad(m):
	return m+chr(16-len(m)%16)*(16-len(m)%16)

clear = pad(clear)
xored = xor(a,b)
resultat = xor(xored,clear)
print(resultat)