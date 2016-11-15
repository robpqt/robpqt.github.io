import csv

def faireTableau(link):

	content = []
	content1 = []
	content2 = []
	content3 = []

	i=0

	#Ecriture du contenu du fichier dans une liste
	with open(link,"r") as f:
		for line in f:
			for word in line.split():
				content.append(word)
				i+=1
	
	for idx,item in enumerate(content):

		#Gestion du 1er Cas
		if item=="CLINTON:":
			
			#Calcul de l'indice du prochain qui va parler
			j=idx+1
			while content[j]!="TRUMP:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
			
			k=idx+1
			while content[k]!="HOLT:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res4=k-idx

			k=idx+1
			while content[k]!="WALLACE:":
				if k==len(content)-1:
					break
				k+=1
			res5=k-idx

			#faireCsv de celui qui parlera en prochain
			res=min(res1,res2,res3,res4,res5)

			for i in range(idx+1,res+idx):
				content1.append(content[i])

		#Gestion du 2eme cas
		if item=="TRUMP:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
			
			k=idx+1
			while content[k]!="HOLT:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res4=k-idx

			k=idx+1
			while content[k]!="WALLACE:":
				if k==len(content)-1:
					break
				k+=1
			res5=k-idx

			res=min(res1,res2,res3,res4,res5)

			for i in range(idx+1,res+idx):
				content2.append(content[i])

		#Gestion du 3ème cas
		if item=="HOLT:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				content3.append(content[i])

		if item=="RADDATZ:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				content3.append(content[i])

		if item=="COOPER:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				content3.append(content[i])

		if item=="WALLACE:":
		
			j=idx+1
			while content[j]!="CLINTON:":
				if j==len(content)-1:
					break
				j+=1
			res1=j-idx
		
			k=idx+1			
			while content[k]!="TRUMP:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			res=min(res1,res2)

			for i in range(idx+1,res+idx):
				content3.append(content[i])

	results = []
	results.append(content1)
	results.append(content2)
	#results.append(content3)

	print("Mise en Tableau OK")

	return results

def faireCsv(linkin, linkout):
	foutWordsCount = open(linkout,"w")
	c = csv.writer(foutWordsCount)

	wordsTable = faireTableau(linkin)
	wordsCount = []

	i=0
	for i in range(0,2):	
		wordsCount.append(len(wordsTable[i]))

	c.writerow(["person","wordsCount"])
	c.writerow(["Clinton",wordsCount[0]])
	c.writerow(["Trump",wordsCount[1]])
	#c.writerow(["Moderator",wordsCount[2]])

	print("Mise en CSV OK")

faireCsv("data/textToAnalyze.txt", "data/WordsCount.csv")
faireCsv("data/textToAnalyze2.txt","data/WordsCount2.csv")
faireCsv("data/textToAnalyze3.txt","data/WordsCount3.csv")

