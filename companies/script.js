var url = "https://raw.githubusercontent.com/cloud-native-nordics/meetups/master/companies.yaml"
var rawdata = null
var data = null
var country = ""

$(document).ready(function() {
    $.get(url, function(yamlData){
        rawdata = jsyaml.load(yamlData);
        country = prompt("Which country?", "finland")
        Vue.component('company', {
            props: ['item'],
            template: `
            <div class="columns holder">
                <div class="logo" 
                    v-bind:style='{ backgroundImage: "url(" + item.logoURL + ")" }'
                    v-bind:class="{ darkLogo: item.whiteLogo }">
                    <p v-if="item.logoURL==''">{{item.name}}</p>
                </div>
            </div>
            `
        })
        data = mapData(rawdata)
        var app = new Vue({
            el: '#app',
            data: data[country],
        })
    })

	slider('.slides')
});

function mapData(indata) {
    var result = {}
    indata.sponsors.forEach(function(company){
        company.countries.forEach(function(country){
            if (result[country] == null) {
                result[country] = {
                    sponsors: [],
                    members: []
                }
            }
            result[country].sponsors.push(company)
        })
    })
    indata.members.forEach(function(company){
        company.countries.forEach(function(country){
            result[country].members.push(company)
        })
    })
    return result
}
