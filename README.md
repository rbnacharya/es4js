# es4js

_NodeJS layer in front of elasticsearch_

## Project Setup

_This is a simple NodeJs Project, Pull and start working_ 

1. _Asumes you have node and npm installed_
2. _to install:`sudo npm install`_
3. _to run: `npm start`_
_

## Testing

_Test is done using mocha `npm test` to run test_

## Usage. 

_Sample request and responses_

> - Throughout the project we are implementing request as ;
> - `<url>/:clientId/api/:services/:otherparameters?queryparameters`

### Search API 

> - The api is used to search documents from elasticsearch
> - In search API `service = search`
> - Syntax is like, `<url>/:clientId/api/search/:types?filters`
> - example, `<url>/test/api/search/people?name|like=john&age|gt=30` gets people(type) from test(index, or client), where name is like john, and age is greater than 30 


## Contributing changes

- _Contribution is highly appreciated_
- _Please open github issues_
- _Just give me pull request_
- _If you want to worktogether, mail me : rbnacharya@gmail.com_

## License

This software is licensed under the GPL 2 license.

Copyright 2009-2014 rbnacharya < rbnacharya@gmail.com >
You may obtain a copy of the License at

    http://www.gnu.org/licenses/gpl-2.0.txt
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
