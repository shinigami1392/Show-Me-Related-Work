import json as json
import os

def loadData(papers):
    json_data = papers
    query_set = ""
    relation_query_set = "CREATE "

    for json_obj in json_data:
        query = "CREATE (Paper"
        query = query + json_obj["id"]+":ResearchPaper {Title:'"
        query = query + json_obj["title"] + "', Author: '"
        author_list = json_obj["authors"]

        for i in range(0, author_list.__len__()-1):
            query = query + author_list[i] + ","

        query = query + author_list[author_list.__len__()-1] + "', "
        query = query + "Domain: '"+json_obj["stream"] + "',"
        query = query + "Link: '" + json_obj["link"] + "'})\n"
        query_set = query_set + query

    ref_count = 0;
    for json_obj in json_data:
        references = json_obj["references"]
        ref_count = ref_count + references.__len__()
        query = ""
        for reference in references:
            query = query + "(Paper" + json_obj["id"]+")-[:HAS_REFERRED]->(Paper"+reference+"),"
        relation_query_set = relation_query_set + query

    new = list(relation_query_set)
    new[new.__len__()-1] = ";"
    new = ''.join(new)
    print new


    dir_path = os.path.dirname(os.path.realpath(__file__))
    filepath = os.path.join(dir_path, 'NodeQueryRunner')
    filepath = os.path.join(filepath, 'query.txt')
    file = open(filepath,"wb")
    file.write(query_set+"\n"+new)
