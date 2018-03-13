import json as json
import os

def loadData(papers):
    json_data = papers
    query_set = ""
    relation_query_set = "CREATE "

 # CREATE (Paper1:ResearchPaper {Id:'1',Title:'Consistency-based search in feature selection', Author: 'ManoranjanDash', Domain: 'Machine Learning / AI', Link: 'http://www.sciencedirect.com/science/article/pii/S0004370203000791'}) 
    try:
        for json_obj in json_data:
            title = json_obj["title"]
            title = title.replace("'","\\'")
            query = "CREATE (Paper"
            query = query + json_obj["id"]+":ResearchPaper {Id:'"+json_obj["id"]+"',Title:'"
            query = query + title + "', Author: '"
            author_list = json_obj["authors"]

            for i in range(0, author_list.__len__()-1):
                author = author_list[i].replace("'","\\'")
                query = query + author + ","

            query = query + author_list[author_list.__len__()-1] + "', "
            query = query + "Domain: '"+json_obj["stream"] + "',"
            query = query + "Link: '" + json_obj["link"] + "'})\n"
            query_set = query_set + query
    except Exception, e:
        print e.message

    try:
        ref_count = 0;
        for json_obj in json_data:
            references = json_obj["references"]
            ref_count = ref_count + len(references)
            query = ""
            
            for reference in references:
                query = query + str("(Paper" + json_obj["id"]+")-[:HAS_REFERRED{ upvotes:'0', downvotes: '0'}]->(Paper"+reference+"),")
            relation_query_set = relation_query_set + query

        if not ref_count:
            relation_query_set = ''

    except Exception,e:
        print e.message

    if relation_query_set:
        relation_query_set = relation_query_set[:-1] + ';'


    dir_path = os.path.dirname(os.path.realpath(__file__))
    # filepath = os.path.join(dir_path, 'NodeQueryRunner')
    filepath = os.path.join(dir_path, 'query.txt')
    file = open(filepath,"wb")
    file.write(query_set+"\n"+relation_query_set)
