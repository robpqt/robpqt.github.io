import csv

def filter(link):

	#Création des fichiers qui contiendront les mots de chaques participants
	#fout1 = open("/Users/robpqt/Documents/leDevoir/data/sortie_filter_1.txt","w")
	#fout2 = open("/Users/robpqt/Documents/leDevoir/data/sortie_filter_2.txt","w")
	#fout3 = open("/Users/robpqt/Documents/leDevoir/data/sortie_filter_3.txt","w")

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
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			#Test de celui qui parlera en prochain
			res=min(res1,res2,res3)

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
			while content[k]!="RADDATZ:":
				if k==len(content)-1:
					break
				k+=1
			res2=k-idx

			k=idx+1
			while content[k]!="COOPER:":
				if k==len(content)-1:
					break
				k+=1
			res3=k-idx

			#Test de celui qui parlera en prochain
			res=min(res1,res2,res3)

			for i in range(idx+1,res+idx):
				content2.append(content[i])

		#Gestion du 3ème cas
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

	#Ecriture dans les 3 fichers
	#fout1.write(str(content1))	
	#fout2.write(str(content2))					
	#fout3.write(str(content3))	
	#fout1.close()
	#fout2.close()
	#fout3.close()

	results = []
	results.append(content1)
	results.append(content2)
	results.append(content3)

	print("Le comptage de mot a marché!")

	return results

def test():
	foutWordsCount = open("/Users/robpqt/Documents/leDevoir/data/wordsCount2.csv","w")
	c = csv.writer(foutWordsCount)

	wordsTable = filter("/Users/robpqt/Documents/leDevoir/data/textToAnalyze2.txt")
	wordsCount = []

	i=0
	for i in range(0,3):	
		wordsCount.append(len(wordsTable[i]))

	#foutWordsCount.write(str(wordsCount))
	c.writerow(["person","wordsCount"])
	c.writerow(["Clinton",wordsCount[0]])
	c.writerow(["Trump",wordsCount[1]])
	c.writerow(["Moderator",wordsCount[2]])



test()

