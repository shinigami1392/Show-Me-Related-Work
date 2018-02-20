import json as json

json_data = json.load(open('response.json'))
json_obj = json_data[0]

query_set = ""
relation_query_set = "CREATE"

for json_obj in json_data:
    query = "CREATE (Paper"
    query = query + json_obj["id"]+":ResearchPaper {Title:'"
    query = query + json_obj["title"] + "', Author: '"
    author_list = json_obj["authors"]


    for i in range(0, author_list.__len__()-1):
        query = query + author_list[i] + ","

    query = query + author_list[author_list.__len__()-1] + "', "
    query = query + "Domain: 'Mechanical',"
    query = query + "Link: '" + json_obj["link"] + "'})\n"
    query_set = query_set + query

#print query_set
ref_count = 0;
for json_obj in json_data:
    references = json_obj["references"]
    ref_count = ref_count + references.__len__()
    query = ""
    for reference in references:
        query = query + "(Paper" + json_obj["id"]+")-[:HAS_REFERRED]->(Paper"+reference+"),"
    relation_query_set = relation_query_set + query

#print ref_count

new = list(relation_query_set)
new[new.__len__()-2] = ";"
new = ''.join(new)
#print new

file = open("query.txt","w")
file.write(query_set+"\n"+new)
