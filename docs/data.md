# List Collections

GET https://api.webflow.com/v2/sites/{site_id}/collections

List of all Collections within a Site.

Required scope | `cms:read`


Reference: https://developers.webflow.com/data/reference/cms/collections/list

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Collections
  version: endpoint_collections.list
paths:
  /sites/{site_id}/collections:
    get:
      operationId: list
      summary: List Collections
      description: |
        List of all Collections within a Site.

        Required scope | `cms:read`
      tags:
        - - subpackage_collections
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_list_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    SitesSiteIdCollectionsGetResponsesContentApplicationJsonSchemaCollectionsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        displayName:
          type: string
        singularName:
          type: string
        slug:
          type: string
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
      required:
        - id
    collections_list_Response_200:
      type: object
      properties:
        collections:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCollectionsGetResponsesContentApplicationJsonSchemaCollectionsItems

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.list(
    site_id="580e63e98c9a982ac9b8b741",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.list("580e63e98c9a982ac9b8b741");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Collection Details

GET https://api.webflow.com/v2/collections/{collection_id}

Get the full details of a collection from its ID.

Required scope | `cms:read`


Reference: https://developers.webflow.com/data/reference/cms/collections/get

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Collection Details
  version: endpoint_collections.get
paths:
  /collections/{collection_id}:
    get:
      operationId: get
      summary: Get Collection Details
      description: |
        Get the full details of a collection from its ID.

        Required scope | `cms:read`
      tags:
        - - subpackage_collections
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_get_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsType:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: ExtFileRef
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: MultiReference
        - value: Number
        - value: Option
        - value: Phone
        - value: PlainText
        - value: Reference
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - type: integer
        - type: object
          additionalProperties:
            description: Any type
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidations:
      type: object
      properties:
        additionalProperties:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties
    CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isRequired:
          type: boolean
        isEditable:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsType
        slug:
          type: string
        displayName:
          type: string
        helpText:
          type: string
        validations:
          oneOf:
            - $ref: >-
                #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItemsValidations
            - type: 'null'
      required:
        - id
        - isRequired
        - type
        - displayName
    collections_get_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        displayName:
          type: string
        singularName:
          type: string
        slug:
          type: string
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        fields:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdGetResponsesContentApplicationJsonSchemaFieldsItems
      required:
        - id
        - displayName
        - singularName
        - fields

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.get(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.get("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create Collection

POST https://api.webflow.com/v2/sites/{site_id}/collections
Content-Type: application/json

Create a Collection for a site with collection fields.

Each collection includes the required _name_ and _slug_ fields, which are generated automatically. You can update the `displayName` of these fields, but the slug for them cannot be changed. Fields slugs are automatically converted to lowercase. Spaces in slugs are replaced with hyphens.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collections/create

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Collection
  version: endpoint_collections.create
paths:
  /sites/{site_id}/collections:
    post:
      operationId: create
      summary: Create Collection
      description: >
        Create a Collection for a site with collection fields.


        Each collection includes the required _name_ and _slug_ fields, which
        are generated automatically. You can update the `displayName` of these
        fields, but the slug for them cannot be changed. Fields slugs are
        automatically converted to lowercase. Spaces in slugs are replaced with
        hyphens.


        Required scope | `cms:write`
      tags:
        - - subpackage_collections
      parameters:
        - name: site_id
          in: path
          description: Unique identifier for a Site
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_create_Response_200'
        '400':
          description: Validation failure
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Collection already exists
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: >-
          Pass the Name of the collection, as well as the singular name of each
          item in the collection.
        content:
          application/json:
            schema:
              type: object
              properties:
                displayName:
                  type: string
                singularName:
                  type: string
                slug:
                  type: string
                fields:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems
              required:
                - displayName
                - singularName
components:
  schemas:
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf0Type:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: Number
        - value: Phone
        - value: PlainText
        - value: RichText
        - value: Switch
        - value: VideoLink
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems0:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf0Type
        displayName:
          type: string
        helpText:
          type: string
      required:
        - type
        - displayName
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Type:
      type: string
      enum:
        - value: Option
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1MetadataOptionsItems:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
      required:
        - name
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Metadata:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1MetadataOptionsItems
      required:
        - options
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems1:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf1Metadata
      required:
        - type
        - displayName
        - metadata
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Type:
      type: string
      enum:
        - value: MultiReference
        - value: Reference
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Metadata:
      type: object
      properties:
        collectionId:
          type: string
      required:
        - collectionId
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems2:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItemsOneOf2Metadata
      required:
        - type
        - displayName
        - metadata
    SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems:
      oneOf:
        - $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems0
        - $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems1
        - $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostRequestBodyContentApplicationJsonSchemaFieldsItems2
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsType:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: ExtFileRef
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: MultiReference
        - value: Number
        - value: Option
        - value: Phone
        - value: PlainText
        - value: Reference
        - value: RichText
        - value: Switch
        - value: VideoLink
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - type: integer
        - type: object
          additionalProperties:
            description: Any type
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidations:
      type: object
      properties:
        additionalProperties:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidationsAdditionalProperties
    SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isRequired:
          type: boolean
        isEditable:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsType
        slug:
          type: string
        displayName:
          type: string
        helpText:
          type: string
        validations:
          oneOf:
            - $ref: >-
                #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItemsValidations
            - type: 'null'
      required:
        - id
        - isRequired
        - type
        - displayName
    collections_create_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        displayName:
          type: string
        singularName:
          type: string
        slug:
          type: string
        createdOn:
          type: string
          format: date-time
        lastUpdated:
          type: string
          format: date-time
        fields:
          type: array
          items:
            $ref: >-
              #/components/schemas/SitesSiteIdCollectionsPostResponsesContentApplicationJsonSchemaFieldsItems
      required:
        - id
        - displayName
        - singularName
        - fields

```

## SDK Code Examples

```python
from webflow import ReferenceField, ReferenceFieldMetadata, StaticField, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.create(
    site_id="580e63e98c9a982ac9b8b741",
    display_name="Blog Posts",
    singular_name="Blog Post",
    slug="posts",
    fields=[
        StaticField(
            is_required=True,
            type="PlainText",
            display_name="Title",
            help_text="The title of the blog post",
        ),
        StaticField(
            is_required=True,
            type="RichText",
            display_name="Content",
            help_text="The content of the blog post",
        ),
        ReferenceField(
            is_required=True,
            type="Reference",
            display_name="Author",
            help_text="The author of the blog post",
            metadata=ReferenceFieldMetadata(
                collection_id="23cc2d952d4e4631ffd4345d2743db4e",
            ),
        ),
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.create("580e63e98c9a982ac9b8b741", {
    displayName: "Blog Posts",
    singularName: "Blog Post",
    slug: "posts",
    fields: [{
            isRequired: true,
            type: "PlainText",
            displayName: "Title",
            helpText: "The title of the blog post"
        }, {
            isRequired: true,
            type: "RichText",
            displayName: "Content",
            helpText: "The content of the blog post"
        }, {
            isRequired: true,
            type: "Reference",
            displayName: "Author",
            helpText: "The author of the blog post",
            metadata: {
                collectionId: "23cc2d952d4e4631ffd4345d2743db4e"
            }
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections"

	payload := strings.NewReader("{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections', [
  'body' => '{
  "displayName": "Blog Posts",
  "singularName": "Blog Post",
  "slug": "posts",
  "fields": [
    {
      "isRequired": true,
      "type": "PlainText",
      "displayName": "Title",
      "helpText": "The title of the blog post",
      "slug": "title"
    },
    {
      "isRequired": true,
      "type": "RichText",
      "displayName": "Content",
      "helpText": "The content of the blog post",
      "slug": "content"
    },
    {
      "isRequired": true,
      "type": "Reference",
      "displayName": "Author",
      "helpText": "The author of the blog post",
      "metadata": {
        "collectionId": "23cc2d952d4e4631ffd4345d2743db4e"
      },
      "slug": "author"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"displayName\": \"Blog Posts\",\n  \"singularName\": \"Blog Post\",\n  \"slug\": \"posts\",\n  \"fields\": [\n    {\n      \"isRequired\": true,\n      \"type\": \"PlainText\",\n      \"displayName\": \"Title\",\n      \"helpText\": \"The title of the blog post\",\n      \"slug\": \"title\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"RichText\",\n      \"displayName\": \"Content\",\n      \"helpText\": \"The content of the blog post\",\n      \"slug\": \"content\"\n    },\n    {\n      \"isRequired\": true,\n      \"type\": \"Reference\",\n      \"displayName\": \"Author\",\n      \"helpText\": \"The author of the blog post\",\n      \"metadata\": {\n        \"collectionId\": \"23cc2d952d4e4631ffd4345d2743db4e\"\n      },\n      \"slug\": \"author\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "displayName": "Blog Posts",
  "singularName": "Blog Post",
  "slug": "posts",
  "fields": [
    [
      "isRequired": true,
      "type": "PlainText",
      "displayName": "Title",
      "helpText": "The title of the blog post",
      "slug": "title"
    ],
    [
      "isRequired": true,
      "type": "RichText",
      "displayName": "Content",
      "helpText": "The content of the blog post",
      "slug": "content"
    ],
    [
      "isRequired": true,
      "type": "Reference",
      "displayName": "Author",
      "helpText": "The author of the blog post",
      "metadata": ["collectionId": "23cc2d952d4e4631ffd4345d2743db4e"],
      "slug": "author"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Delete Collection

DELETE https://api.webflow.com/v2/collections/{collection_id}

Delete a collection using its ID.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collections/delete

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Delete Collection
  version: endpoint_collections.delete
paths:
  /collections/{collection_id}:
    delete:
      operationId: delete
      summary: Delete Collection
      description: |
        Delete a collection using its ID.

        Required scope | `cms:write`
      tags:
        - - subpackage_collections
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful. No Content is returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_delete_Response_204'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    collections_delete_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.delete(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.delete("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745"

	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create field

POST https://api.webflow.com/v2/collections/{collection_id}/fields
Content-Type: application/json

Create a custom field in a collection.

Field validation is currently not available through the API.

Bulk creation of fields is not supported with this endpoint. To add multiple fields at once, include them when you [create the collection.](/data/v2.0.0/reference/cms/collections/create)

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-fields/create

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Collection Field
  version: endpoint_collections/fields.create
paths:
  /collections/{collection_id}/fields:
    post:
      operationId: create
      summary: Create Collection Field
      description: >
        Create a custom field in a collection.


        Field validation is currently not available through the API.


        Bulk creation of fields is not supported with this endpoint. To add
        multiple fields at once, include them when you [create the
        collection.](/data/v2.0.0/reference/cms/collections/create)


        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/fields
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_fields_create_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Collection already exists
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: The field to create
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/collections_fields_create_Request'
components:
  schemas:
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf0Type:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: Number
        - value: Phone
        - value: PlainText
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsFieldsCreateRequest0:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf0Type
        displayName:
          type: string
        helpText:
          type: string
      required:
        - type
        - displayName
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Type:
      type: string
      enum:
        - value: Option
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1MetadataOptionsItems:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
      required:
        - name
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Metadata:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1MetadataOptionsItems
      required:
        - options
    CollectionsFieldsCreateRequest1:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf1Metadata
      required:
        - type
        - displayName
        - metadata
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Type:
      type: string
      enum:
        - value: MultiReference
        - value: Reference
    CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Metadata:
      type: object
      properties:
        collectionId:
          type: string
      required:
        - collectionId
    CollectionsFieldsCreateRequest2:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostRequestBodyContentApplicationJsonSchemaOneOf2Metadata
      required:
        - type
        - displayName
        - metadata
    collections_fields_create_Request:
      oneOf:
        - $ref: '#/components/schemas/CollectionsFieldsCreateRequest0'
        - $ref: '#/components/schemas/CollectionsFieldsCreateRequest1'
        - $ref: '#/components/schemas/CollectionsFieldsCreateRequest2'
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf0Type:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: Number
        - value: Phone
        - value: PlainText
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsFieldsCreateResponse2000:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf0Type
        displayName:
          type: string
        helpText:
          type: string
      required:
        - type
        - displayName
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Type:
      type: string
      enum:
        - value: Option
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1MetadataOptionsItems:
      type: object
      properties:
        name:
          type: string
        id:
          type: string
      required:
        - name
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Metadata:
      type: object
      properties:
        options:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1MetadataOptionsItems
      required:
        - options
    CollectionsFieldsCreateResponse2001:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf1Metadata
      required:
        - type
        - displayName
        - metadata
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Type:
      type: string
      enum:
        - value: MultiReference
        - value: Reference
    CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Metadata:
      type: object
      properties:
        collectionId:
          type: string
      required:
        - collectionId
    CollectionsFieldsCreateResponse2002:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isEditable:
          type: boolean
        isRequired:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Type
        displayName:
          type: string
        helpText:
          type: string
        metadata:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsPostResponsesContentApplicationJsonSchemaOneOf2Metadata
      required:
        - type
        - displayName
        - metadata
    collections_fields_create_Response_200:
      oneOf:
        - $ref: '#/components/schemas/CollectionsFieldsCreateResponse2000'
        - $ref: '#/components/schemas/CollectionsFieldsCreateResponse2001'
        - $ref: '#/components/schemas/CollectionsFieldsCreateResponse2002'

```

## SDK Code Examples

```python StaticField
from webflow import StaticField, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.create(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=StaticField(
        id="562ac0395358780a1f5e6fbc",
        is_editable=True,
        is_required=False,
        type="RichText",
        display_name="Post Body",
        help_text="Add the body of your post here",
    ),
)

```

```typescript StaticField
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.create("580e63fc8c9a982ac9b8b745", {
    id: "562ac0395358780a1f5e6fbc",
    isEditable: true,
    isRequired: false,
    type: "RichText",
    displayName: "Post Body",
    helpText: "Add the body of your post here"
});

```

```go StaticField
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby StaticField
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}"

response = http.request(request)
puts response.read_body
```

```java StaticField
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")
  .asString();
```

```php StaticField
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields', [
  'body' => '{
  "isRequired": false,
  "type": "RichText",
  "displayName": "Post Body",
  "helpText": "Add the body of your post here",
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp StaticField
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"type\": \"RichText\",\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\",\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift StaticField
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "type": "RichText",
  "displayName": "Post Body",
  "helpText": "Add the body of your post here",
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python OptionField
from webflow import Metadata, MetadataOptionsItem, OptionField, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.create(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=OptionField(
        id="562ac0395358780a1f5e6fbc",
        is_editable=True,
        is_required=False,
        display_name="Post Type",
        help_text="Add the body of your post here",
        metadata=Metadata(
            options=[
                MetadataOptionsItem(
                    name="Feature",
                ),
                MetadataOptionsItem(
                    name="News",
                ),
                MetadataOptionsItem(
                    name="Product Highlight",
                ),
            ],
        ),
    ),
)

```

```typescript OptionField
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.create("580e63fc8c9a982ac9b8b745", {
    id: "562ac0395358780a1f5e6fbc",
    isEditable: true,
    isRequired: false,
    type: "Option",
    displayName: "Post Type",
    helpText: "Add the body of your post here",
    metadata: {
        options: [{
                name: "Feature"
            }, {
                name: "News"
            }, {
                name: "Product Highlight"
            }]
    }
});

```

```go OptionField
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby OptionField
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}"

response = http.request(request)
puts response.read_body
```

```java OptionField
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}")
  .asString();
```

```php OptionField
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields', [
  'body' => '{
  "isRequired": false,
  "type": "Option",
  "displayName": "Post Type",
  "helpText": "Add the body of your post here",
  "metadata": {
    "options": [
      {
        "name": "Feature"
      },
      {
        "name": "News"
      },
      {
        "name": "Product Highlight"
      }
    ]
  },
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp OptionField
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"type\": \"Option\",\n  \"displayName\": \"Post Type\",\n  \"helpText\": \"Add the body of your post here\",\n  \"metadata\": {\n    \"options\": [\n      {\n        \"name\": \"Feature\"\n      },\n      {\n        \"name\": \"News\"\n      },\n      {\n        \"name\": \"Product Highlight\"\n      }\n    ]\n  },\n  \"id\": \"562ac0395358780a1f5e6fbc\",\n  \"isEditable\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift OptionField
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "type": "Option",
  "displayName": "Post Type",
  "helpText": "Add the body of your post here",
  "metadata": ["options": [["name": "Feature"], ["name": "News"], ["name": "Product Highlight"]]],
  "id": "562ac0395358780a1f5e6fbc",
  "isEditable": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python ReferenceField
from webflow import ReferenceField, ReferenceFieldMetadata, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.create(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ReferenceField(
        id="562ac0395358780a1f5e6fbd",
        is_editable=True,
        is_required=False,
        type="Reference",
        display_name="Author",
        help_text="Add the post author here",
        metadata=ReferenceFieldMetadata(
            collection_id="63692ab61fb2852f582ba8f5",
        ),
    ),
)

```

```typescript ReferenceField
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.create("580e63fc8c9a982ac9b8b745", {
    id: "562ac0395358780a1f5e6fbd",
    isEditable: true,
    isRequired: false,
    type: "Reference",
    displayName: "Author",
    helpText: "Add the post author here",
    metadata: {
        collectionId: "63692ab61fb2852f582ba8f5"
    }
});

```

```go ReferenceField
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ReferenceField
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}"

response = http.request(request)
puts response.read_body
```

```java ReferenceField
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}")
  .asString();
```

```php ReferenceField
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields', [
  'body' => '{
  "isRequired": false,
  "type": "Reference",
  "displayName": "Author",
  "helpText": "Add the post author here",
  "metadata": {
    "collectionId": "63692ab61fb2852f582ba8f5"
  },
  "id": "562ac0395358780a1f5e6fbd",
  "isEditable": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp ReferenceField
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"type\": \"Reference\",\n  \"displayName\": \"Author\",\n  \"helpText\": \"Add the post author here\",\n  \"metadata\": {\n    \"collectionId\": \"63692ab61fb2852f582ba8f5\"\n  },\n  \"id\": \"562ac0395358780a1f5e6fbd\",\n  \"isEditable\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift ReferenceField
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "type": "Reference",
  "displayName": "Author",
  "helpText": "Add the post author here",
  "metadata": ["collectionId": "63692ab61fb2852f582ba8f5"],
  "id": "562ac0395358780a1f5e6fbd",
  "isEditable": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update field

PATCH https://api.webflow.com/v2/collections/{collection_id}/fields/{field_id}
Content-Type: application/json

Update a custom field in a collection.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-fields/update

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Collection Field
  version: endpoint_collections/fields.update
paths:
  /collections/{collection_id}/fields/{field_id}:
    patch:
      operationId: update
      summary: Update Collection Field
      description: |
        Update a custom field in a collection.

        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/fields
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: field_id
          in: path
          description: Unique identifier for a Field in a collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_fields_update_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: The field details to update
        content:
          application/json:
            schema:
              type: object
              properties:
                isRequired:
                  type: boolean
                displayName:
                  type: string
                helpText:
                  type: string
components:
  schemas:
    CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaType:
      type: string
      enum:
        - value: Color
        - value: DateTime
        - value: Email
        - value: ExtFileRef
        - value: File
        - value: Image
        - value: Link
        - value: MultiImage
        - value: MultiReference
        - value: Number
        - value: Option
        - value: Phone
        - value: PlainText
        - value: Reference
        - value: RichText
        - value: Switch
        - value: VideoLink
    CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidationsAdditionalProperties:
      oneOf:
        - type: string
        - type: number
          format: double
        - type: boolean
        - type: integer
        - type: object
          additionalProperties:
            description: Any type
    CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidations:
      type: object
      properties:
        additionalProperties:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidationsAdditionalProperties
    collections_fields_update_Response_200:
      type: object
      properties:
        id:
          type: string
          format: objectid
        isRequired:
          type: boolean
        isEditable:
          type: boolean
        type:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaType
        slug:
          type: string
        displayName:
          type: string
        helpText:
          type: string
        validations:
          oneOf:
            - $ref: >-
                #/components/schemas/CollectionsCollectionIdFieldsFieldIdPatchResponsesContentApplicationJsonSchemaValidations
            - type: 'null'
      required:
        - id
        - isRequired
        - type
        - displayName

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.update(
    collection_id="580e63fc8c9a982ac9b8b745",
    field_id="580e63fc8c9a982ac9b8b745",
    is_required=False,
    display_name="Post Body",
    help_text="Add the body of your post here",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.update("580e63fc8c9a982ac9b8b745", "580e63fc8c9a982ac9b8b745", {
    isRequired: false,
    displayName: "Post Body",
    helpText: "Add the body of your post here"
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745"

	payload := strings.NewReader("{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745', [
  'body' => '{
  "isRequired": false,
  "displayName": "Post Body",
  "helpText": "Add the body of your post here"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isRequired\": false,\n  \"displayName\": \"Post Body\",\n  \"helpText\": \"Add the body of your post here\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isRequired": false,
  "displayName": "Post Body",
  "helpText": "Add the body of your post here"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Delete field

DELETE https://api.webflow.com/v2/collections/{collection_id}/fields/{field_id}

Delete a custom field in a collection. This endpoint does not currently support bulk deletion.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-fields/delete

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Delete Collection Field
  version: endpoint_collections/fields.delete
paths:
  /collections/{collection_id}/fields/{field_id}:
    delete:
      operationId: delete
      summary: Delete Collection Field
      description: >
        Delete a custom field in a collection. This endpoint does not currently
        support bulk deletion.


        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/fields
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: field_id
          in: path
          description: Unique identifier for a Field in a collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful. No Content is returned.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_fields_delete_Response_204'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    collections_fields_delete_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.fields.delete(
    collection_id="580e63fc8c9a982ac9b8b745",
    field_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.fields.delete("580e63fc8c9a982ac9b8b745", "580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745"

	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/fields/580e63fc8c9a982ac9b8b745")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

---
title: Field Types & Item Values
description: A reference for all Webflow CMS field types and the value formats they accept.
slug: data/reference/field-types-item-values
hidden: false
'og:title': CMS Field Types & Item Values
'og:description': A reference for all Webflow CMS field types and the value formats they accept.
---

This page is a reference for all Webflow CMS field types and the value formats they accept. Use it to:

- Understand each field type’s purpose and behavior
- Learn how to format values when creating or updating items via the API

To retrieve the specific fields used in a collection, call the [Get Collection](/data/reference/cms/collections/get) endpoint.

<Note title="Field Type Names">
Some field types may use slightly different names in the Webflow UI. This document uses the API name for each field type.
</Note>

## [Plain Text](https://university.webflow.com/lesson/plain-text-field)

Stores text without formatting.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```
    "Always know where your towel is."
    ```
  </Tab>
</Tabs>

## [Rich Text](https://university.webflow.com/lesson/rich-text-field)

Stores long-form text with HTML formatting.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```html
    "<p>A small, blue-green planet orbiting an unregarded yellow sun in the uncharted backwaters of the Galaxy's western spiral arm.</p>
    <h3>Notable features</h3>
    <blockquote>It has a population of humans, who are mostly harmless. They have developed digital watches and are known for their ability to make tea.</blockquote>"
    ```
  </Tab>
</Tabs>

<Warning title="Code Blocks in Rich Text Fields">
  The API doesn't currently support code blocks in Rich Text fields. Passing code blocks will result in an empty string.
</Warning>

## [ImageRef / Image](https://university.webflow.com/lesson/image-field)

Stores a single image. Images must be hosted on a publicly accessible URL to be uploaded via the API. The maximum file size for images is 4MB.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Read Value">
    <CodeBlocks>
    ```javascript Format
    {
      "fileId": "string",
      "url": "string",
      "alt": "string" (optional)
    }
    ```
    ```javascript Example
    {
      "fileId": "6390ba25bfe63b0cca1dd136",
      "url": "https://.../image.jpg",
      "alt": "Marvin the Paranoid Android"
    }
    ```
    </CodeBlocks>
  </Tab>
  <Tab title="Write Value">
    To upload a new image, provide an object containing a `url`.
    <CodeBlocks>
    ```javascript title="New Upload"
    {
      "myImageField": {
        "url": "https://.../image.png",
        "alt": "Finn and Jake fist bumping"
      }
    }
    ```
    </CodeBlocks>
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Multi-Image](https://university.webflow.com/lesson/multi-image-field-overview)

Stores multiple images. Images must be hosted on a publicly accessible URL to be uploaded via the API. The maximum file size for each image is 4MB.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Read Value">
    <CodeBlocks>
    ```javascript Format
    [
      {
        "fileId": "string",
        "url": "string",
        "alt": "string" (optional)
      }
    ]
    ```
    ```json Example
    {
      "myImageField": [
        {
          "fileId": "6390ba25bfe63b0cca1dd136",
          "url": "https://.../image1.jpeg",
          "alt": "Marvin the Paranoid Android"
        },
        {
          "fileId": "6390ba25bfe63b0cca1dd137",
          "url": "https://.../image2.jpeg",
          "alt": "Vogon Poetry"
        }
      ]
    }
    ```
    </CodeBlocks>
  </Tab>
  <Tab title="Write Value">
    To upload new images, provide an array of objects, each containing a `url`.
    <CodeBlocks>
    ```javascript title="New Uploads"
    {
      "myImageField": [
        {
          "url": "https://.../image1.png",
          "alt": "Finn and Jake fist bumping"
        },
        {
          "url": "https://.../image2.png",
          "alt": "Finn and Jake hugging"
        }
      ]
    }
    ```
    </CodeBlocks>
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## VideoLink

Accepts a URL string for videos hosted on platforms like YouTube or Vimeo.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myVideoLink": "https://www.youtube.com/watch?v=jfKfPfyJRdk"
    }
    ```
  </Tab>
</Tabs>

## [Link](https://university.webflow.com/lesson/link-field)

Stores a URL.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myLink": "https://www.webflow.com"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Email](https://university.webflow.com/lesson/email-field)

Stores an email address.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myEmail": "hello@webflow.com"
    }
    ```
  </Tab>
</Tabs>

## [Phone](https://university.webflow.com/lesson/phone-field)

Stores a phone number.

<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myPhone": "2024561111"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Number](https://university.webflow.com/lesson/number-field)

Stores an integer or a decimal number.

{/* <!-- vale off --> */}

<Tabs>
  <Tab title="Value Format">
    ```
    number
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myNumber": 42
    }
    ```
  </Tab>
</Tabs>

## [Date/Time](https://university.webflow.com/lesson/date-time-field)

Stores a date and time.

<Tabs>
  <Tab title="Read Value Format">
    ```
    string (ISO 8601)
    ```
  </Tab>
  <Tab title="Write Value Format">
    ```
    Date | string (ISO 8601)
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "myDateTime": "2022-11-18T00:00:00.000Z"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Switch](https://university.webflow.com/lesson/switch-field)

Stores a boolean value (`true` or `false`).

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    boolean
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "mostly-harmless": true
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [Color](https://university.webflow.com/lesson/color-field-overview)

Stores a color value. Accepts HEX, RGB, HSL, and named color formats.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "bulldozer": "#FFFF00"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

Accepted formats include:
- `#RGB`
- `#RGBA`
- `#RRGGBB`
- `#RRGGBBAA`
- `rgb(red,green,blue)`
- `rgba(red,green,blue,alpha)`
- `hsl(hue,saturation,lightness)`
- `hsla(hue,saturation,lightness,alpha)`
- `orchid`, `aqua`, `black`, etc.
- `transparent`


## [Option](https://university.webflow.com/lesson/option-field)

Creates a predefined list of choices for an item.

### Create an Option Field
To create an Option field, send a `POST` request to the [Create Field](/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "Option"` and a `metadata` object containing an `options` array. Each object in the array defines a choice with a `name`.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Create Field Request">
    ```javascript
    {
      "type": "Option",
      "displayName": "milliways-drink-menu",
      "metadata": {
        "options": [
          {"name": "pan-galactic gargle blaster"},
          {"name": "waturi punch"},
          {"name": "gnab gib"}
        ]
      }
    }
    ```
  </Tab>
  <Tab title="Read Field Definition">
    ```javascript
    {
      "type": "Option",
      "validations": {
        "options": [
          {
            "name": "pan-galactic gargle blaster",
            "id": "a1b2c3d4"
          },
          // ...
        ]
      }
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

### Write an option value
To set an option for an item, get the option `id` of the desired option and pass it as a string. You can get the option `id` by calling the [Get Collection Details](/data/reference/cms/collections/get) endpoint and then searching for the option field and it's metadata in the `fields` array.

<Tabs>
  <Tab title="Value Format">
    ```
    string (Option ID)
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "milliways-drink-menu": "a1b2c3d4"
    }
    ```
  </Tab>
</Tabs>


## File

Stores a file reference. You can upload a new file from a public URL or use an existing file by referencing its `fileId`.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Read Value">
    ```javascript
    {
      "fileId": "string",
      "url": "string",
      "alt"?: "string"
    }
    ```
  </Tab>
  <Tab title="Write Value">
    ```javascript
    {
      "url": "https://data.wa.gov/api/views/f6w7-q2d2/rows.csv"
      alt"?: "Electric Vehicle Data"
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

## [ItemRef / Reference](https://university.webflow.com/lesson/reference-field)

Links an item to another item in the same or a different collection.

### Create a reference field
To create a Reference field, send a `POST` request to the [Create Field](/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "Reference"` and a `metadata` object containing the `collectionId` of the collection you want to reference.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Create Field Request">
    ```javascript
    // Include the metadata property in the request body
    {
      "type": "Reference",
      "displayName": "Author",
      "helpText": "Add the post author here",
      "metadata": {
        "collectionId": "63692ab61fb2852f582ba8f5"
      }
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

### Write a reference value
To set a reference for an item, get the item `id` of the referenced item and pass it as a string. You can get the item `id` by calling the [Get Items](/data/reference/cms/collection-items/staged-items/list-items) endpoint for the referenced collection.

<Tabs>
  <Tab title="Value Format">
    ```
    string (Item ID)
    ```
  </Tab>
  <Tab title="Example">
    ```json
    {
      "author": "63764ec7981aa0138e99abc"
    }
    ```
  </Tab>
</Tabs>

## [Multi-Reference](https://university.webflow.com/lesson/multi-reference-field)

Links an item to multiple items in the same or a different collection.

### Create a multi-reference field
To create a Multi-Reference field, send a `POST` request to the [Create Field](/data/reference/cms/collection-fields/create) endpoint. The request body must include `"type": "MultiReference"` and a `metadata` object containing the `collectionId` of the collection you want to reference.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Create Field Request">
    ```javascript
    // Include the metadata property in the request body
    {
      "type": "MultiReference",
      "displayName": "Authors",
      "helpText": "Add post authors here",
      "metadata": {
        "collectionId": "63692ab61fb2852f582ba8f5"
      }
    }
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}

### Write a multi-reference value
To set multiple references for an item, pass an array of item `id` strings.

<Tabs>
  <Tab title="Value Format">
    ```
    [string, string] (Item IDs)
    ```
  </Tab>
  <Tab title="Example">

    ```json
    {
      "authors": [
        "63764ec7981aa0138e99abc",
        "63764ec7981aa0138e99abd"
      ]
    }
    ```
  </Tab>
</Tabs>


## User

A read-only field containing the unique ID of a Webflow user. This field is used for the "created-by" and "updated-by" properties on an item.

{/* <!-- vale off --> */}
<Tabs>
  <Tab title="Value Format">
    ```
    string
    ```
  </Tab>
  <Tab title="Example">
    ```
    "Person_63209baeac0b804b455624ce"
    ```
  </Tab>
</Tabs>
{/* <!-- vale on --> */}


# List Items

GET https://api.webflow.com/v2/collections/{collection_id}/items

List of all Items within a Collection.

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Collection Items
  version: endpoint_collections/items.list-items
paths:
  /collections/{collection_id}/items:
    get:
      operationId: list-items
      summary: List Collection Items
      description: |
        List of all Items within a Collection.

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: name
          in: query
          description: Filter by the exact name of the item(s)
          required: false
          schema:
            type: string
        - name: slug
          in: query
          description: Filter by the exact slug of the item
          required: false
          schema:
            type: string
        - name: lastPublished
          in: query
          description: Filter by the last published date of the item(s)
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetParametersLastPublished
        - name: sortBy
          in: query
          description: Sort results by the provided value
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetParametersSortBy
        - name: sortOrder
          in: query
          description: Sorts the results by asc or desc
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetParametersSortOrder
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_items_list-items_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsGetParametersLastPublished:
      type: object
      properties:
        lte:
          type: string
          format: date-time
        gte:
          type: string
          format: date-time
    CollectionsCollectionIdItemsGetParametersSortBy:
      type: string
      enum:
        - value: lastPublished
        - value: name
        - value: slug
    CollectionsCollectionIdItemsGetParametersSortOrder:
      type: string
      enum:
        - value: asc
        - value: desc
    CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
    collections_items_list-items_Response_200:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaItemsItems
        pagination:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsGetResponsesContentApplicationJsonSchemaPagination
      required:
        - items
        - pagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.list_items(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.listItems("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?offset=0&limit=100")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Item

GET https://api.webflow.com/v2/collections/{collection_id}/items/{item_id}

Get details of a selected Collection Item.

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/get-item

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Collection Item
  version: endpoint_collections/items.get-item
paths:
  /collections/{collection_id}/items/{item_id}:
    get:
      operationId: get-item
      summary: Get Collection Item
      description: |
        Get details of a selected Collection Item.

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: item_id
          in: path
          description: Unique identifier for an Item
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/collections_items_get-item_Response_200'
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsItemIdGetResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    collections_items_get-item_Response_200:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsItemIdGetResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.get_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    item_id="580e64008c9a982ac9b8b754",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.getItem("580e63fc8c9a982ac9b8b745", "580e64008c9a982ac9b8b754");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```
# Create Items

POST https://api.webflow.com/v2/collections/{collection_id}/items/bulk
Content-Type: application/json

Create an item or multiple items in a CMS Collection across multiple corresponding locales.

<Note>
  - This endpoint can create up to 100 items in a request.
  - If the `cmsLocaleIds` parameter is not included in the request, an item will only be created in the primary locale.
</Note>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-item

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Collection Items
  version: endpoint_collections/items.create-items
paths:
  /collections/{collection_id}/items/bulk:
    post:
      operationId: create-items
      summary: Create Collection Items
      description: >
        Create an item or multiple items in a CMS Collection across multiple
        corresponding locales.


        <Note>
          - This endpoint can create up to 100 items in a request.
          - If the `cmsLocaleIds` parameter is not included in the request, an item will only be created in the primary locale.
        </Note>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_create-items_Response_202
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                cmsLocaleIds:
                  type: array
                  items:
                    type: string
                lastPublished:
                  type: string
                  format: date-string
                lastUpdated:
                  type: string
                  format: date-string
                createdOn:
                  type: string
                  format: date-string
                isArchived:
                  type: boolean
                isDraft:
                  type: boolean
                fieldData:
                  $ref: >-
                    #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData
              required:
                - fieldData
components:
  schemas:
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData0:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldDataOneOf1Items:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData1:
      type: array
      items:
        $ref: >-
          #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldDataOneOf1Items
    CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData:
      oneOf:
        - $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData0
        - $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsBulkPostRequestBodyContentApplicationJsonSchemaFieldData1
    CollectionsCollectionIdItemsBulkPostResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
    collections_items_create-items_Response_202:
      type: object
      properties:
        id:
          type: string
        cmsLocaleIds:
          type: array
          items:
            type: string
        lastPublished:
          type:
            - string
            - 'null'
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsBulkPostResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - cmsLocaleIds
        - lastPublished
        - lastUpdated
        - createdOn
        - isArchived
        - isDraft
        - fieldData

```

## SDK Code Examples

```python Single item created across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import SingleCmsItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=[
        "66f6e966c9e1dc700a857ca3",
        "66f6e966c9e1dc700a857ca4",
        "66f6e966c9e1dc700a857ca5",
    ],
    is_archived=False,
    is_draft=False,
    field_data=SingleCmsItem(
        name="Don’t Panic",
        slug="dont-panic",
    ),
)

```

```typescript Single item created across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
    isArchived: false,
    isDraft: false,
    fieldData: {
        name: "Don\u2019t Panic",
        slug: "dont-panic"
    }
});

```

```go Single item created across multiple locales
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Single item created across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Single item created across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Single item created across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Single item created across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Single item created across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Multiple items created across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import SingleCmsItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=[
        "66f6e966c9e1dc700a857ca3",
        "66f6e966c9e1dc700a857ca4",
        "66f6e966c9e1dc700a857ca5",
    ],
    is_archived=False,
    is_draft=False,
    field_data=SingleCmsItem(
        name="Don’t Panic",
        slug="dont-panic",
    ),
)

```

```typescript Multiple items created across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
    isArchived: false,
    isDraft: false,
    fieldData: {
        name: "Don\u2019t Panic",
        slug: "dont-panic"
    }
});

```

```go Multiple items created across multiple locales
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Multiple items created across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Multiple items created across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Multiple items created across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Multiple items created across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Multiple items created across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Create a single item across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import SingleCmsItem

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=[
        "66f6e966c9e1dc700a857ca3",
        "66f6e966c9e1dc700a857ca4",
        "66f6e966c9e1dc700a857ca5",
    ],
    is_archived=False,
    is_draft=False,
    field_data=SingleCmsItem(
        name="Don’t Panic",
        slug="dont-panic",
    ),
)

```

```typescript Create a single item across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
    isArchived: false,
    isDraft: false,
    fieldData: {
        name: "Don\u2019t Panic",
        slug: "dont-panic"
    }
});

```

```go Create a single item across multiple locales
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Create a single item across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}"

response = http.request(request)
puts response.read_body
```

```java Create a single item across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")
  .asString();
```

```php Create a single item across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'body' => '{
  "fieldData": {
    "name": "Don’t Panic",
    "slug": "dont-panic"
  },
  "cmsLocaleIds": [
    "66f6e966c9e1dc700a857ca3",
    "66f6e966c9e1dc700a857ca4",
    "66f6e966c9e1dc700a857ca5"
  ],
  "isArchived": false,
  "isDraft": false
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Create a single item across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"fieldData\": {\n    \"name\": \"Don’t Panic\",\n    \"slug\": \"dont-panic\"\n  },\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\",\n    \"66f6e966c9e1dc700a857ca5\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Create a single item across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "fieldData": [
    "name": "Don’t Panic",
    "slug": "dont-panic"
  ],
  "cmsLocaleIds": ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4", "66f6e966c9e1dc700a857ca5"],
  "isArchived": false,
  "isDraft": false
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Create multiple items across multiple locales
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    CreateBulkCollectionItemRequestBodyFieldDataItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    cms_locale_ids=["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4"],
    is_archived=False,
    is_draft=False,
    field_data=[
        CreateBulkCollectionItemRequestBodyFieldDataItem(
            name="Don’t Panic",
            slug="dont-panic",
        ),
        CreateBulkCollectionItemRequestBodyFieldDataItem(
            name="So Long and Thanks for All the Fish",
            slug="so-long-and-thanks",
        ),
    ],
)

```

```typescript Create multiple items across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItems("580e63fc8c9a982ac9b8b745", {
    cmsLocaleIds: ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4"],
    isArchived: false,
    isDraft: false,
    fieldData: [{
            name: "Don\u2019t Panic",
            slug: "dont-panic"
        }, {
            name: "So Long and Thanks for All the Fish",
            slug: "so-long-and-thanks"
        }]
});

```

```go Create multiple items across multiple locales
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Create multiple items across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}"

response = http.request(request)
puts response.read_body
```

```java Create multiple items across multiple locales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}")
  .asString();
```

```php Create multiple items across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true', [
  'body' => '{
  "fieldData": [
    {
      "name": "Don’t Panic",
      "slug": "dont-panic"
    },
    {
      "name": "So Long and Thanks for All the Fish",
      "slug": "so-long-and-thanks"
    }
  ],
  "cmsLocaleIds": [
    "66f6e966c9e1dc700a857ca3",
    "66f6e966c9e1dc700a857ca4"
  ],
  "isArchived": false,
  "isDraft": false
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Create multiple items across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"fieldData\": [\n    {\n      \"name\": \"Don’t Panic\",\n      \"slug\": \"dont-panic\"\n    },\n    {\n      \"name\": \"So Long and Thanks for All the Fish\",\n      \"slug\": \"so-long-and-thanks\"\n    }\n  ],\n  \"cmsLocaleIds\": [\n    \"66f6e966c9e1dc700a857ca3\",\n    \"66f6e966c9e1dc700a857ca4\"\n  ],\n  \"isArchived\": false,\n  \"isDraft\": false\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Create multiple items across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "fieldData": [
    [
      "name": "Don’t Panic",
      "slug": "dont-panic"
    ],
    [
      "name": "So Long and Thanks for All the Fish",
      "slug": "so-long-and-thanks"
    ]
  ],
  "cmsLocaleIds": ["66f6e966c9e1dc700a857ca3", "66f6e966c9e1dc700a857ca4"],
  "isArchived": false,
  "isDraft": false
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/bulk?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Items

PATCH https://api.webflow.com/v2/collections/{collection_id}/items
Content-Type: application/json

Update a single item or multiple items in a Collection.

The limit for this endpoint is 100 items.

<Tip title="Localization Tip">Items will only be updated in the primary locale, unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-items

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Collection Items
  version: endpoint_collections/items.update-items
paths:
  /collections/{collection_id}/items:
    patch:
      operationId: update-items
      summary: Update Collection Items
      description: >
        Update a single item or multiple items in a Collection.


        The limit for this endpoint is 100 items.


        <Tip title="Localization Tip">Items will only be updated in the primary
        locale, unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_update-items_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the item to update
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItems
components:
  schemas:
    CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
    CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf0FieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsItemsUpdateItemsResponse2000:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf0FieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1Pagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
    CollectionsItemsUpdateItemsResponse2001:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1ItemsItems
        pagination:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsPatchResponsesContentApplicationJsonSchemaOneOf1Pagination
    collections_items_update-items_Response_200:
      oneOf:
        - $ref: '#/components/schemas/CollectionsItemsUpdateItemsResponse2000'
        - $ref: '#/components/schemas/CollectionsItemsUpdateItemsResponse2001'

```

## SDK Code Examples

```python LocalizedItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript LocalizedItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItems("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go LocalizedItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby LocalizedItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java LocalizedItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")
  .asString();
```

```php LocalizedItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp LocalizedItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift LocalizedItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python MultipleItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Senior Data Analyst",
                slug="senior-data-analyst",
            ),
        ),
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Product Manager",
                slug="product-manager",
            ),
        ),
    ],
)

```

```typescript MultipleItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItems("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Senior Data Analyst",
                slug: "senior-data-analyst"
            }
        }, {
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Product Manager",
                slug: "product-manager"
            }
        }]
});

```

```go MultipleItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby MultipleItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java MultipleItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php MultipleItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      }
    },
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp MultipleItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift MultipleItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      ]
    ],
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Delete Items

DELETE https://api.webflow.com/v2/collections/{collection_id}/items
Content-Type: application/json

Delete Items from a Collection.

<Tip title="Localization Tip">Items will only be deleted in the primary locale unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/delete-items

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Delete Collection Items
  version: endpoint_collections/items.delete-items
paths:
  /collections/{collection_id}/items:
    delete:
      operationId: delete-items
      summary: Delete Collection Items
      description: >
        Delete Items from a Collection.


        <Tip title="Localization Tip">Items will only be deleted in the primary
        locale unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_delete-items_Response_204
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Site is published to multiple domains at different times
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the items to delete
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsDeleteRequestBodyContentApplicationJsonSchemaItemsItems
              required:
                - items
components:
  schemas:
    CollectionsCollectionIdItemsDeleteRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleIds:
          type: array
          items:
            type: string
      required:
        - id
    collections_items_delete-items_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemsDeleteItemsRequestItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.delete_items(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        ItemsDeleteItemsRequestItemsItem(
            id="580e64008c9a982ac9b8b754",
        )
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.deleteItems("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754"
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("DELETE", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [["id": "580e64008c9a982ac9b8b754"]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Publish Items

POST https://api.webflow.com/v2/collections/{collection_id}/items/publish
Content-Type: application/json

Publish an item or multiple items.

Required scope | `cms:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Publish Collection Item
  version: endpoint_collections/items.publish-item
paths:
  /collections/{collection_id}/items/publish:
    post:
      operationId: publish-item
      summary: Publish Collection Item
      description: |
        Publish an item or multiple items.

        Required scope | `cms:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_publish-item_Response_202
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Site is published to multiple domains at different times
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: An array of Item IDs
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/collections_items_publish-item_Request'
components:
  schemas:
    CollectionsItemsPublishItemRequest0:
      type: object
      properties:
        itemIds:
          type: array
          items:
            type: string
            format: objectid
    CollectionsCollectionIdItemsPublishPostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems:
      type: object
      properties:
        id:
          type: string
          format: objectid
        cmsLocaleIds:
          type: array
          items:
            type: string
      required:
        - id
    CollectionsItemsPublishItemRequest1:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsPublishPostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems
    collections_items_publish-item_Request:
      oneOf:
        - $ref: '#/components/schemas/CollectionsItemsPublishItemRequest0'
        - $ref: '#/components/schemas/CollectionsItemsPublishItemRequest1'
    collections_items_publish-item_Response_202:
      type: object
      properties:
        publishedItemIds:
          type: array
          items:
            type: string
        errors:
          type: array
          items:
            type: string

```

## SDK Code Examples

```python collections_items_publish-item_example
from webflow import Webflow
from webflow.resources.collections.resources.items import ItemIDs

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDs(
        item_ids=[
            "643fd856d66b6528195ee2ca",
            "643fd856d66b6528195ee2cb",
            "643fd856d66b6528195ee2cc",
        ],
    ),
)

```

```typescript collections_items_publish-item_example
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    itemIds: ["643fd856d66b6528195ee2ca", "643fd856d66b6528195ee2cb", "643fd856d66b6528195ee2cc"]
});

```

```go collections_items_publish-item_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby collections_items_publish-item_example
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java collections_items_publish-item_example
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php collections_items_publish-item_example
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp collections_items_publish-item_example
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift collections_items_publish-item_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python PrimaryLocale
from webflow import Webflow
from webflow.resources.collections.resources.items import ItemIDs

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDs(
        item_ids=[
            "643fd856d66b6528195ee2ca",
            "643fd856d66b6528195ee2cb",
            "643fd856d66b6528195ee2cc",
        ],
    ),
)

```

```typescript PrimaryLocale
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    itemIds: ["643fd856d66b6528195ee2ca", "643fd856d66b6528195ee2cb", "643fd856d66b6528195ee2cc"]
});

```

```go PrimaryLocale
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	payload := strings.NewReader("{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby PrimaryLocale
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java PrimaryLocale
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}")
  .asString();
```

```php PrimaryLocale
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'body' => '{
  "itemIds": [
    "643fd856d66b6528195ee2ca",
    "643fd856d66b6528195ee2cb",
    "643fd856d66b6528195ee2cc"
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp PrimaryLocale
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"itemIds\": [\n    \"643fd856d66b6528195ee2ca\",\n    \"643fd856d66b6528195ee2cb\",\n    \"643fd856d66b6528195ee2cc\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift PrimaryLocale
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["itemIds": ["643fd856d66b6528195ee2ca", "643fd856d66b6528195ee2cb", "643fd856d66b6528195ee2cc"]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python SecondaryLocale
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemIDsWithLocales,
    ItemsPublishItemRequestItemsItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDsWithLocales(
        items=[
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2ca",
                cms_locale_ids=["653ad57de882f528b32e810e"],
            ),
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2cb",
                cms_locale_ids=["653ad57de882f528b32e810e"],
            ),
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2cc",
                cms_locale_ids=["653ad57de882f528b32e810e"],
            ),
        ],
    ),
)

```

```typescript SecondaryLocale
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "643fd856d66b6528195ee2ca",
            cmsLocaleIds: ["653ad57de882f528b32e810e"]
        }, {
            id: "643fd856d66b6528195ee2cb",
            cmsLocaleIds: ["653ad57de882f528b32e810e"]
        }, {
            id: "643fd856d66b6528195ee2cc",
            cmsLocaleIds: ["653ad57de882f528b32e810e"]
        }]
});

```

```go SecondaryLocale
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby SecondaryLocale
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java SecondaryLocale
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}")
  .asString();
```

```php SecondaryLocale
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'body' => '{
  "items": [
    {
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e"
      ]
    },
    {
      "id": "643fd856d66b6528195ee2cb",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e"
      ]
    },
    {
      "id": "643fd856d66b6528195ee2cc",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e"
      ]
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp SecondaryLocale
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cb\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    },\n    {\n      \"id\": \"643fd856d66b6528195ee2cc\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\"\n      ]\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift SecondaryLocale
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": ["653ad57de882f528b32e810e"]
    ],
    [
      "id": "643fd856d66b6528195ee2cb",
      "cmsLocaleIds": ["653ad57de882f528b32e810e"]
    ],
    [
      "id": "643fd856d66b6528195ee2cc",
      "cmsLocaleIds": ["653ad57de882f528b32e810e"]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python MultipleLocales
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemIDsWithLocales,
    ItemsPublishItemRequestItemsItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.publish_item(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=ItemIDsWithLocales(
        items=[
            ItemsPublishItemRequestItemsItemsItem(
                id="643fd856d66b6528195ee2ca",
                cms_locale_ids=[
                    "653ad57de882f528b32e810e",
                    "6514390aea353fc691d69827",
                    "65143930ea353fc691d69cd8",
                ],
            )
        ],
    ),
)

```

```typescript MultipleLocales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.publishItem("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "643fd856d66b6528195ee2ca",
            cmsLocaleIds: ["653ad57de882f528b32e810e", "6514390aea353fc691d69827", "65143930ea353fc691d69cd8"]
        }]
});

```

```go MultipleLocales
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby MultipleLocales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java MultipleLocales
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}")
  .asString();
```

```php MultipleLocales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish', [
  'body' => '{
  "items": [
    {
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": [
        "653ad57de882f528b32e810e",
        "6514390aea353fc691d69827",
        "65143930ea353fc691d69cd8"
      ]
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp MultipleLocales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"643fd856d66b6528195ee2ca\",\n      \"cmsLocaleIds\": [\n        \"653ad57de882f528b32e810e\",\n        \"6514390aea353fc691d69827\",\n        \"65143930ea353fc691d69cd8\"\n      ]\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift MultipleLocales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "643fd856d66b6528195ee2ca",
      "cmsLocaleIds": ["653ad57de882f528b32e810e", "6514390aea353fc691d69827", "65143930ea353fc691d69cd8"]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/publish")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# List Live Items

GET https://api.webflow.com/v2/collections/{collection_id}/items/live

List all published items in a collection.

<Note title="Serve data with the Content Delivery API">
  To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

</Note>

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: List Live Collection Items
  version: endpoint_collections/items.list-items-live
paths:
  /collections/{collection_id}/items/live:
    get:
      operationId: list-items-live
      summary: List Live Collection Items
      description: |
        List all published items in a collection.

        <Note title="Serve data with the Content Delivery API">
          To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

        </Note>

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: offset
          in: query
          description: >-
            Offset used for pagination if the results have more than limit
            records
          required: false
          schema:
            type: number
            format: double
        - name: limit
          in: query
          description: 'Maximum number of records to be returned (max limit: 100)'
          required: false
          schema:
            type: number
            format: double
        - name: name
          in: query
          description: Filter by the exact name of the item(s)
          required: false
          schema:
            type: string
        - name: slug
          in: query
          description: Filter by the exact slug of the item
          required: false
          schema:
            type: string
        - name: lastPublished
          in: query
          description: Filter by the last published date of the item(s)
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetParametersLastPublished
        - name: sortBy
          in: query
          description: Sort results by the provided value
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetParametersSortBy
        - name: sortOrder
          in: query
          description: Sorts the results by asc or desc
          required: false
          schema:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetParametersSortOrder
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_list-items-live_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsLiveGetParametersLastPublished:
      type: object
      properties:
        lte:
          type: string
          format: date-time
        gte:
          type: string
          format: date-time
    CollectionsCollectionIdItemsLiveGetParametersSortBy:
      type: string
      enum:
        - value: lastPublished
        - value: name
        - value: slug
    CollectionsCollectionIdItemsLiveGetParametersSortOrder:
      type: string
      enum:
        - value: asc
        - value: desc
    CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaPagination:
      type: object
      properties:
        limit:
          type: number
          format: double
        offset:
          type: number
          format: double
        total:
          type: number
          format: double
    collections_items_list-items-live_Response_200:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaItemsItems
        pagination:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLiveGetResponsesContentApplicationJsonSchemaPagination
      required:
        - items
        - pagination

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.list_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.listItemsLive("580e63fc8c9a982ac9b8b745");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?offset=0&limit=100")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Get Live Item

GET https://api.webflow.com/v2/collections/{collection_id}/items/{item_id}/live

Get details of a selected Collection live Item.

<Note title="Serve data with the Content Delivery API">
  To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

</Note>

Required scope | `CMS:read`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/get-item-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Get Live Collection Item
  version: endpoint_collections/items.get-item-live
paths:
  /collections/{collection_id}/items/{item_id}/live:
    get:
      operationId: get-item-live
      summary: Get Live Collection Item
      description: |
        Get details of a selected Collection live Item.

        <Note title="Serve data with the Content Delivery API">
          To serve content to your other frontends applications, enterprise sites have access to a dedicated [content delivery API](/data/docs/cms-content-delivery), available at api-cdn.webflow.com.

        </Note>

        Required scope | `CMS:read`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: item_id
          in: path
          description: Unique identifier for an Item
          required: true
          schema:
            type: string
            format: objectid
        - name: cmsLocaleId
          in: query
          description: >-
            Unique identifier for a CMS Locale. This UID is different from the
            Site locale identifier and is listed as `cmsLocaleId` in the Sites
            response. To query multiple locales, input a comma separated string.
          required: false
          schema:
            type: string
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_get-item-live_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
components:
  schemas:
    CollectionsCollectionIdItemsItemIdLiveGetResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    collections_items_get-item-live_Response_200:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsItemIdLiveGetResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData

```

## SDK Code Examples

```python
from webflow import Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.get_item_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    item_id="580e64008c9a982ac9b8b754",
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.getItemLive("580e63fc8c9a982ac9b8b745", "580e64008c9a982ac9b8b754");

```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.get("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754/live")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Create Live Items

POST https://api.webflow.com/v2/collections/{collection_id}/items/live
Content-Type: application/json

Create item(s) in a collection that will be immediately published to the live site.


To create items across multiple locales, [please use this endpoint.](/data/reference/cms/collection-items/staged-items/create-items)


Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/create-item-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Create Live Collection Item(s)
  version: endpoint_collections/items.create-item-live
paths:
  /collections/{collection_id}/items/live:
    post:
      operationId: create-item-live
      summary: Create Live Collection Item(s)
      description: >
        Create item(s) in a collection that will be immediately published to the
        live site.



        To create items across multiple locales, [please use this
        endpoint.](/data/reference/cms/collection-items/staged-items/create-items)



        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '202':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_create-item-live_Response_202
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the item(s) to create
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/collections_items_create-item-live_Request'
components:
  schemas:
    CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf0FieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsItemsCreateItemLiveRequest0:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf0FieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    CollectionsItemsCreateItemLiveRequest1:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLivePostRequestBodyContentApplicationJsonSchemaOneOf1ItemsItems
    collections_items_create-item-live_Request:
      oneOf:
        - $ref: '#/components/schemas/CollectionsItemsCreateItemLiveRequest0'
        - $ref: '#/components/schemas/CollectionsItemsCreateItemLiveRequest1'
    CollectionsCollectionIdItemsLivePostResponsesContentApplicationJsonSchemaFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    collections_items_create-item-live_Response_202:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePostResponsesContentApplicationJsonSchemaFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData

```

## SDK Code Examples

```python
from webflow import CollectionItem, CollectionItemFieldData, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_item_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=CollectionItem(
        is_archived=False,
        is_draft=False,
        field_data=CollectionItemFieldData(
            name="Pan Galactic Gargle Blaster Recipe",
            slug="pan-galactic-gargle-blaster",
        ),
    ),
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItemLive("580e63fc8c9a982ac9b8b745", {
    body: {
        isArchived: false,
        isDraft: false,
        fieldData: {
            name: "Pan Galactic Gargle Blaster Recipe",
            slug: "pan-galactic-gargle-blaster"
        }
    }
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      }
    },
    {
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      ]
    ],
    [
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python
from webflow import CollectionItem, CollectionItemFieldData, Webflow

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.create_item_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    request=CollectionItem(
        is_archived=False,
        is_draft=False,
        field_data=CollectionItemFieldData(
            name="Pan Galactic Gargle Blaster Recipe",
            slug="pan-galactic-gargle-blaster",
        ),
    ),
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.createItemLive("580e63fc8c9a982ac9b8b745", {
    body: {
        isArchived: false,
        isDraft: false,
        fieldData: {
            name: "Pan Galactic Gargle Blaster Recipe",
            slug: "pan-galactic-gargle-blaster"
        }
    }
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.post("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "isArchived": false,
  "isDraft": false,
  "fieldData": {
    "name": "The Hitchhiker\'s Guide to the Galaxy",
    "slug": "hitchhikers-guide-to-the-galaxy",
    "plain-text": "Don\'t Panic.",
    "rich-text": "<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don\'t forget yours!</strong></p>",
    "main-image": {
      "fileId": "62b720ef280c7a7a3be8cabe",
      "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
    },
    "image-gallery": [
      {
        "fileId": "62b720ef280c7a7a3be8cabd",
        "url": "/files/62b720ef280c7a7a3be8cabd_image.png"
      },
      {
        "fileId": "62b720ef280c7a7a3be8cabe",
        "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
      }
    ],
    "intro-video": "https://www.youtube.com/watch?v=aJ83KAggd-4",
    "official-site": "https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    "contact-email": "zaphod.beeblebrox@heartofgold.gov",
    "support-phone": "424-242-4242",
    "answer-to-everything": 42,
    "release-date": "1979-10-12T00:00:00.000Z",
    "is-featured": true,
    "brand-color": "#000000",
    "category": "62b720ef280c7a7a3be8cabf",
    "author": "62b720ef280c7a7a3be8cab0",
    "tags": [
      "62b720ef280c7a7a3be8cab1",
      "62b720ef280c7a7a3be8cab2"
    ],
    "downloadable-asset": {
      "fileId": "62b720ef280c7a7a3be8cab3",
      "url": "/files/62b720ef280c7a7a3be8cab3_document.pdf"
    }
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"isArchived\": false,\n  \"isDraft\": false,\n  \"fieldData\": {\n    \"name\": \"The Hitchhiker's Guide to the Galaxy\",\n    \"slug\": \"hitchhikers-guide-to-the-galaxy\",\n    \"plain-text\": \"Don't Panic.\",\n    \"rich-text\": \"<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>\",\n    \"main-image\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n    },\n    \"image-gallery\": [\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabd\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabd_image.png\"\n      },\n      {\n        \"fileId\": \"62b720ef280c7a7a3be8cabe\",\n        \"url\": \"/files/62b720ef280c7a7a3be8cabe_image.png\"\n      }\n    ],\n    \"intro-video\": \"https://www.youtube.com/watch?v=aJ83KAggd-4\",\n    \"official-site\": \"https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy\",\n    \"contact-email\": \"zaphod.beeblebrox@heartofgold.gov\",\n    \"support-phone\": \"424-242-4242\",\n    \"answer-to-everything\": 42,\n    \"release-date\": \"1979-10-12T00:00:00.000Z\",\n    \"is-featured\": true,\n    \"brand-color\": \"#000000\",\n    \"category\": \"62b720ef280c7a7a3be8cabf\",\n    \"author\": \"62b720ef280c7a7a3be8cab0\",\n    \"tags\": [\n      \"62b720ef280c7a7a3be8cab1\",\n      \"62b720ef280c7a7a3be8cab2\"\n    ],\n    \"downloadable-asset\": {\n      \"fileId\": \"62b720ef280c7a7a3be8cab3\",\n      \"url\": \"/files/62b720ef280c7a7a3be8cab3_document.pdf\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "isArchived": false,
  "isDraft": false,
  "fieldData": [
    "name": "The Hitchhiker's Guide to the Galaxy",
    "slug": "hitchhikers-guide-to-the-galaxy",
    "plain-text": "Don't Panic.",
    "rich-text": "<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don't forget yours!</strong></p>",
    "main-image": [
      "fileId": "62b720ef280c7a7a3be8cabe",
      "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
    ],
    "image-gallery": [
      [
        "fileId": "62b720ef280c7a7a3be8cabd",
        "url": "/files/62b720ef280c7a7a3be8cabd_image.png"
      ],
      [
        "fileId": "62b720ef280c7a7a3be8cabe",
        "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
      ]
    ],
    "intro-video": "https://www.youtube.com/watch?v=aJ83KAggd-4",
    "official-site": "https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    "contact-email": "zaphod.beeblebrox@heartofgold.gov",
    "support-phone": "424-242-4242",
    "answer-to-everything": 42,
    "release-date": "1979-10-12T00:00:00.000Z",
    "is-featured": true,
    "brand-color": "#000000",
    "category": "62b720ef280c7a7a3be8cabf",
    "author": "62b720ef280c7a7a3be8cab0",
    "tags": ["62b720ef280c7a7a3be8cab1", "62b720ef280c7a7a3be8cab2"],
    "downloadable-asset": [
      "fileId": "62b720ef280c7a7a3be8cab3",
      "url": "/files/62b720ef280c7a7a3be8cab3_document.pdf"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Update Live Items

PATCH https://api.webflow.com/v2/collections/{collection_id}/items/live
Content-Type: application/json

Update a single published item or multiple published items (up to 100) in a Collection

<Tip title="Localization Tip">Items will only be updated in the primary locale, unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/update-items-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Update Live Collection Items
  version: endpoint_collections/items.update-items-live
paths:
  /collections/{collection_id}/items/live:
    patch:
      operationId: update-items-live
      summary: Update Live Collection Items
      description: >
        Update a single published item or multiple published items (up to 100)
        in a Collection


        <Tip title="Localization Tip">Items will only be updated in the primary
        locale, unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: skipInvalidFiles
          in: query
          description: >-
            When true, invalid files are skipped and processing continues. When
            false, the entire request fails if any file is invalid.
          required: false
          schema:
            type: boolean
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_update-items-live_Response_200
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '409':
          description: Conflict with server data. Item not published
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the live items to update
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItems
components:
  schemas:
    CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
    CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePatchRequestBodyContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
    CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItemsFieldData:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
      required:
        - name
        - slug
    CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleId:
          type: string
        lastPublished:
          type: string
          format: date-string
        lastUpdated:
          type: string
          format: date-string
        createdOn:
          type: string
          format: date-string
        isArchived:
          type: boolean
        isDraft:
          type: boolean
        fieldData:
          $ref: >-
            #/components/schemas/CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItemsFieldData
      required:
        - id
        - lastPublished
        - lastUpdated
        - createdOn
        - fieldData
    collections_items_update-items-live_Response_200:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: >-
              #/components/schemas/CollectionsCollectionIdItemsLivePatchResponsesContentApplicationJsonSchemaItemsItems

```

## SDK Code Examples

```python Multiple items updated across multiple locales
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript Multiple items updated across multiple locales
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go Multiple items updated across multiple locales
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	req, _ := http.NewRequest("PATCH", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Multiple items updated across multiple locales
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Multiple items updated across multiple locales
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Multiple items updated across multiple locales
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Multiple items updated across multiple locales
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Multiple items updated across multiple locales
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python Multiple items updated in a single locale
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript Multiple items updated in a single locale
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go Multiple items updated in a single locale
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	req, _ := http.NewRequest("PATCH", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Multiple items updated in a single locale
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'

response = http.request(request)
puts response.read_body
```

```java Multiple items updated in a single locale
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .asString();
```

```php Multiple items updated in a single locale
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Multiple items updated in a single locale
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
IRestResponse response = client.Execute(request);
```

```swift Multiple items updated in a single locale
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python LocalizedItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Ne Paniquez Pas",
                slug="ne-paniquez-pas",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5ea6",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="No Entrar en Pánico",
                slug="no-entrar-en-panico",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca5",
            field_data=CollectionItemWithIdInputFieldData(
                name="Au Revoir et Merci pour Tous les Poissons",
                slug="au-revoir-et-merci",
            ),
        ),
        CollectionItemWithIdInput(
            id="66f6ed9576ddacf3149d5eaa",
            cms_locale_id="66f6e966c9e1dc700a857ca4",
            field_data=CollectionItemWithIdInputFieldData(
                name="Hasta Luego y Gracias por Todo el Pescado",
                slug="hasta-luego-y-gracias",
            ),
        ),
    ],
)

```

```typescript LocalizedItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Ne Paniquez Pas",
                slug: "ne-paniquez-pas"
            }
        }, {
            id: "66f6ed9576ddacf3149d5ea6",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "No Entrar en P\u00E1nico",
                slug: "no-entrar-en-panico"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca5",
            fieldData: {
                name: "Au Revoir et Merci pour Tous les Poissons",
                slug: "au-revoir-et-merci"
            }
        }, {
            id: "66f6ed9576ddacf3149d5eaa",
            cmsLocaleId: "66f6e966c9e1dc700a857ca4",
            fieldData: {
                name: "Hasta Luego y Gracias por Todo el Pescado",
                slug: "hasta-luego-y-gracias"
            }
        }]
});

```

```go LocalizedItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby LocalizedItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java LocalizedItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}")
  .asString();
```

```php LocalizedItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": {
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      }
    },
    {
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": {
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp LocalizedItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Ne Paniquez Pas\",\n        \"slug\": \"ne-paniquez-pas\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5ea6\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"No Entrar en Pánico\",\n        \"slug\": \"no-entrar-en-panico\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca5\",\n      \"fieldData\": {\n        \"name\": \"Au Revoir et Merci pour Tous les Poissons\",\n        \"slug\": \"au-revoir-et-merci\",\n        \"featured\": false\n      }\n    },\n    {\n      \"id\": \"66f6ed9576ddacf3149d5eaa\",\n      \"cmsLocaleId\": \"66f6e966c9e1dc700a857ca4\",\n      \"fieldData\": {\n        \"name\": \"Hasta Luego y Gracias por Todo el Pescado\",\n        \"slug\": \"hasta-luego-y-gracias\",\n        \"featured\": false\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift LocalizedItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Ne Paniquez Pas",
        "slug": "ne-paniquez-pas",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5ea6",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "No Entrar en Pánico",
        "slug": "no-entrar-en-panico",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca5",
      "fieldData": [
        "name": "Au Revoir et Merci pour Tous les Poissons",
        "slug": "au-revoir-et-merci",
        "featured": false
      ]
    ],
    [
      "id": "66f6ed9576ddacf3149d5eaa",
      "cmsLocaleId": "66f6e966c9e1dc700a857ca4",
      "fieldData": [
        "name": "Hasta Luego y Gracias por Todo el Pescado",
        "slug": "hasta-luego-y-gracias",
        "featured": false
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

```python MultipleItems
from webflow import (
    CollectionItemWithIdInput,
    CollectionItemWithIdInputFieldData,
    Webflow,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.update_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Senior Data Analyst",
                slug="senior-data-analyst",
            ),
        ),
        CollectionItemWithIdInput(
            id="580e64008c9a982ac9b8b754",
            is_archived=False,
            is_draft=False,
            field_data=CollectionItemWithIdInputFieldData(
                name="Product Manager",
                slug="product-manager",
            ),
        ),
    ],
)

```

```typescript MultipleItems
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.updateItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Senior Data Analyst",
                slug: "senior-data-analyst"
            }
        }, {
            id: "580e64008c9a982ac9b8b754",
            isArchived: false,
            isDraft: false,
            fieldData: {
                name: "Product Manager",
                slug: "product-manager"
            }
        }]
});

```

```go MultipleItems
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby MultipleItems
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java MultipleItems
HttpResponse<String> response = Unirest.patch("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}")
  .asString();
```

```php MultipleItems
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      }
    },
    {
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": {
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      }
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp MultipleItems
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Senior Data Analyst\",\n        \"slug\": \"senior-data-analyst\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/26567701\",\n        \"department\": \"Data\"\n      }\n    },\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\",\n      \"isArchived\": false,\n      \"isDraft\": false,\n      \"fieldData\": {\n        \"name\": \"Product Manager\",\n        \"slug\": \"product-manager\",\n        \"url\": \"https://boards.greenhouse.io/webflow/jobs/31234567\",\n        \"department\": \"Product\"\n      }\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift MultipleItems
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Senior Data Analyst",
        "slug": "senior-data-analyst",
        "url": "https://boards.greenhouse.io/webflow/jobs/26567701",
        "department": "Data"
      ]
    ],
    [
      "id": "580e64008c9a982ac9b8b754",
      "isArchived": false,
      "isDraft": false,
      "fieldData": [
        "name": "Product Manager",
        "slug": "product-manager",
        "url": "https://boards.greenhouse.io/webflow/jobs/31234567",
        "department": "Product"
      ]
    ]
  ]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live?skipInvalidFiles=true")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

# Unpublish Live Items

DELETE https://api.webflow.com/v2/collections/{collection_id}/items/live
Content-Type: application/json

Unpublish up to 100 items from the live site and set the `isDraft` property to `true`.

<Tip title="Localization Tip">Items will only be unpublished in the primary locale unless a `cmsLocaleId` is included in the request.</Tip>

Required scope | `CMS:write`


Reference: https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-items-live

## OpenAPI Specification

```yaml
openapi: 3.1.1
info:
  title: Unpublish Live Collection Items
  version: endpoint_collections/items.delete-items-live
paths:
  /collections/{collection_id}/items/live:
    delete:
      operationId: delete-items-live
      summary: Unpublish Live Collection Items
      description: >
        Unpublish up to 100 items from the live site and set the `isDraft`
        property to `true`.


        <Tip title="Localization Tip">Items will only be unpublished in the
        primary locale unless a `cmsLocaleId` is included in the request.</Tip>


        Required scope | `CMS:write`
      tags:
        - - subpackage_collections
          - subpackage_collections/items
      parameters:
        - name: collection_id
          in: path
          description: Unique identifier for a Collection
          required: true
          schema:
            type: string
            format: objectid
        - name: Authorization
          in: header
          description: >-
            Bearer authentication of the form `Bearer <token>`, where token is
            your auth token.
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Request was successful
          content:
            application/json:
              schema:
                $ref: >-
                  #/components/schemas/collections_items_delete-items-live_Response_204
        '400':
          description: Request body was incorrectly formatted.
          content: {}
        '401':
          description: >-
            Provided access token is invalid or does not have access to
            requested resource
          content: {}
        '404':
          description: Requested resource not found
          content: {}
        '429':
          description: >-
            The rate limit of the provided access_token has been reached. Please
            have your application respect the X-RateLimit-Remaining header we
            include on API responses.
          content: {}
        '500':
          description: We had a problem with our server. Try again later.
          content: {}
      requestBody:
        description: Details of the live items to delete
        content:
          application/json:
            schema:
              type: object
              properties:
                items:
                  type: array
                  items:
                    $ref: >-
                      #/components/schemas/CollectionsCollectionIdItemsLiveDeleteRequestBodyContentApplicationJsonSchemaItemsItems
              required:
                - items
components:
  schemas:
    CollectionsCollectionIdItemsLiveDeleteRequestBodyContentApplicationJsonSchemaItemsItems:
      type: object
      properties:
        id:
          type: string
        cmsLocaleIds:
          type: array
          items:
            type: string
      required:
        - id
    collections_items_delete-items-live_Response_204:
      type: object
      properties: {}

```

## SDK Code Examples

```python
from webflow import Webflow
from webflow.resources.collections.resources.items import (
    ItemsDeleteItemsLiveRequestItemsItem,
)

client = Webflow(
    access_token="YOUR_ACCESS_TOKEN",
)
client.collections.items.delete_items_live(
    collection_id="580e63fc8c9a982ac9b8b745",
    items=[
        ItemsDeleteItemsLiveRequestItemsItem(
            id="580e64008c9a982ac9b8b754",
        )
    ],
)

```

```typescript
import { WebflowClient } from "webflow-api";

const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });
await client.collections.items.deleteItemsLive("580e63fc8c9a982ac9b8b745", {
    items: [{
            id: "580e64008c9a982ac9b8b754"
        }]
});

```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live"

	payload := strings.NewReader("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")

	req, _ := http.NewRequest("DELETE", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
HttpResponse<String> response = Unirest.delete("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}")
  .asString();
```

```php
<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live', [
  'body' => '{
  "items": [
    {
      "id": "580e64008c9a982ac9b8b754"
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
var client = new RestClient("https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"items\": [\n    {\n      \"id\": \"580e64008c9a982ac9b8b754\"\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["items": [["id": "580e64008c9a982ac9b8b754"]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/live")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```
