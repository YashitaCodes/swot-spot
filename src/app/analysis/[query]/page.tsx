"use client"
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({params}: { params: {query: string}}) {
  const [userQuery, setUserQuery] = useState("");
  const [showWarning, setShowWarning] = useState(true)
  
  const [swotData, setSwotData] = useState({
    Strengths: [],
    Weaknesses: [],
    Opportunities: [],
    Threats: []
  });
  
  const [marketData, setMarketData] = useState({
    Demographic: [],
    Psychographic: [],
    Behavioral: []
  });
  
  const [competitorData, setCompetitorData] = useState({
    Competitor1: [],
    Competitor2: [],
    Competitor3: []
  });
  
  const [valueData, setValueData] = useState({
    CustomerProfile: [],
    ValueProposition: []
  });
  
  const [riskData, setRiskData] = useState({
    FinancialRisk: [],
    OperationalRisk: [],
    MarketRisk: []
  });

  const [loading, setLoading] = useState(true);

  // URL Decode Params
  useEffect(() => {
    const decodedQuery = decodeURIComponent(params.query);
    setUserQuery(decodedQuery);
  }, [params.query]);

  // SWOT Analysis
  useEffect(() => {
    const fetchSwotData = async () => {
      if (userQuery) {
        const prompt = `Here is a business idea from a user: ${userQuery}. I want you to conduct a swot analysis for this and give me 4 short points each on strengths, weaknesses, opportunities and threats in a JSON format resembling this: {
          "SWOT": {
            "Strengths": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ],
            "Weaknesses": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ],
            "Opportunities": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ],
            "Threats": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ]
          }
        }`;

        console.log("Prompt:", prompt);

        setLoading(true);
        try {
          // Make the POST request to the API
          const response = await fetch("http://localhost:3000/api/generate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: prompt }) // Sending the constructed prompt
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Response from Groq:", data.response || "No response");

            // Extracting JSON assuming the response is structured correctly
            const swotJson = data.response; // Adjust if necessary based on your actual response structure
            const { SWOT } = JSON.parse(swotJson); // Assuming swotJson is a JSON string

            setSwotData({
              Strengths: SWOT.Strengths || [],
              Weaknesses: SWOT.Weaknesses || [],
              Opportunities: SWOT.Opportunities || [],
              Threats: SWOT.Threats || []
            });

            setLoading(false);
          } else {
            console.error("Failed to get a response:", response.status, await response.text());
          }
        } catch (error: any) {
          console.error("An error occurred:", error.message);
        } 
      }
    };

    fetchSwotData();
  }, [userQuery]);
  
  // Market Segmentation Analysis
  useEffect(() => {
    const fetchMarketData = async () => {
      if (userQuery) {
        // Construct the prompt with userQuery
        const MarketPrompt = `Here is a business idea from a user: ${userQuery}. I want you to conduct a market segementation analysis for this and give me 4 short points each on strengths, weaknesses, opportunities and threats in a JSON format resembling this: {
          "MARKET": {
            "Demographic": [
              "Age: bullet point 1",
              "Gender: bullet point 2",
              "Income: bullet point 3",
              "Education: bullet point 4"
            ],
            "Psychographic": [
              "Lifestyle: bullet point 1",
              "Interests: bullet point 2",
              "Values: bullet point 3",
              "Personality: bullet point 4"
            ],
            "Behavioral": [
              "Purchase Behavior: bullet point 1",
              "Usage Patterns: bullet point 2",
              "Loyalty: bullet point 3",
              "Engagement: bullet point 4"
            ]
          }
        }`;

        console.log("Prompt:", MarketPrompt);

        setLoading(true);
        try {
          // Make the POST request to the API
          const response = await fetch("http://localhost:3000/api/generate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: MarketPrompt }) // Sending the constructed prompt
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Response from Groq:", data.response || "No response");

            const marketJson = data.response; 
            const { MARKET } = JSON.parse(marketJson); 

            setMarketData({
              Demographic: MARKET.Demographic || [],
              Psychographic: MARKET.Psychographic || [],
              Behavioral: MARKET.Behavioral || []
            });

            setLoading(false);
          } else {
            console.error("Failed to get a response:", response.status, await response.text());
          }
        } catch (error: any) {
          console.error("An error occurred:", error.message);
        } 
      }
    };

    fetchMarketData();
  }, [userQuery]);

  // Competitor Analysis
  useEffect(() => {
    const fetchCompetitorData = async () => {
      if (userQuery) {
        // Construct the prompt with userQuery
        const compPrompt = `Here is a business idea from a user: ${userQuery}. I want you to conduct a competitor analysis for this and give me 4 short points each on 3 different competitors in a JSON format resembling this: {
          "COMP": {
            "Competitor 1 Name": [
              "Market Share: bullet point 1",
              "Product Offering: bullet point 2",
              "Pricing: bullet point 3",
              "Strengths: bullet point 4",
              "Weaknesses: bullet point 5"
            ],
            "Competitor 2 Name": [
              "Market Share: bullet point 1",
              "Product Offering: bullet point 2",
              "Pricing: bullet point 3",
              "Strengths: bullet point 4",
              "Weaknesses: bullet point 5"
            ],
            "Competitor 3 Name": [
              "Market Share: bullet point 1",
              "Product Offering: bullet point 2",
              "Pricing: bullet point 3",
              "Strengths: bullet point 4",
              "Weaknesses: bullet point 5"
            ]
          }
        }`;

        console.log("Competitor Prompt:", compPrompt);

        try {
          // Make the POST request to the API
          const response = await fetch("http://localhost:3000/api/generate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: compPrompt }) // Sending the constructed prompt
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Response from Groq:", data.response || "No response");

            // Extracting JSON assuming the response is structured correctly
            const compJson = data.response; // Adjust if necessary based on your actual response structure
            const { COMP } = JSON.parse(compJson); 

            setCompetitorData({
              Competitor1: COMP.Analysis1 || [],
              Competitor2: COMP.Analysis2 || [],
              Competitor3: COMP.Opportunities || [],
            });

            setLoading(false);
          } else {
            console.error("Failed to get a response:", response.status, await response.text());
          }
        } catch (error: any) {
          console.error("An error occurred:", error.message);
        } 
      }
    };

    fetchCompetitorData();
  }, [userQuery]);

  // Value Proposition Canvas
  useEffect(() => {
    const fetchValueData = async () => {
      if (userQuery) {
        // Construct the prompt with userQuery
        const valuePrompt = `Here is a business idea from a user: ${userQuery}. I want you to conduct a value proposition analysis for this and give me 3 short points each on customer profile and value propsition in a JSON format resembling this: {
          "VALUE": {
            "CustomerProfile": [
              "Jobs: bullet point 1",
              "Pains: bullet point 2",
              "Gains: bullet point 3"
            ],
            "ValueProposition": [
              "Products: bullet point 1",
              "Pain Relievers: bullet point 2",
              "Gain Creators: bullet point 3",
            ]
          }
        }`;

        console.log("Prompt:", valuePrompt);

        setLoading(true);
        try {
          // Make the POST request to the API
          const response = await fetch("http://localhost:3000/api/generate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: valuePrompt }) // Sending the constructed prompt
          });

          if (response.ok) {
            const valueData = await response.json();
            console.log("Response from Groq:", valueData.response || "No response");

            const valueJson = valueData.response; 
            const { VALUE } = JSON.parse(valueJson); 

            setValueData({
              CustomerProfile: VALUE.CustomerProfile || [],
              ValueProposition: VALUE.ValueProposition || [],
            });
            
            setLoading(false);
          } else {
            console.error("Failed to get a response:", response.status, await response.text());
          }
        } catch (error: any) {
          console.error("An error occurred:", error.message);
        } 
      }
    };

    fetchValueData();
  }, [userQuery]);

  // Risk Analysis
  useEffect(() => {
    const fetchRiskData = async () => {
      if (userQuery) {
        // Construct the prompt with userQuery
        const riskPrompt = `Here is a business idea from a user: ${userQuery}. I want you to conduct a risk analysis for this and give me 4 short points each in a JSON format resembling this: {
          "RISK": {
            "FinancialRisk": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ],
            "OperationalRisk": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ],
            "MarketRisk": [
              "bullet point 1",
              "bullet point 2",
              "bullet point 3",
              "bullet point 4"
            ]
          }
        }`;

        console.log("Prompt:", riskPrompt);

        setLoading(true);
        try {
          // Make the POST request to the API
          const response = await fetch("http://localhost:3000/api/generate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userInput: riskPrompt }) // Sending the constructed prompt
          });

          if (response.ok) {
            const riskData = await response.json();
            console.log("Response from Groq:", riskData.response || "No response");

            const riskJson = riskData.response; 
            const { RISK } = JSON.parse(riskJson);

            setRiskData({
              FinancialRisk: RISK.FinancialRisk || [],
              OperationalRisk: RISK.OperationalRisk || [],
              MarketRisk: RISK.MarketRisk || []
            });

            setLoading(false);
          } else {
            console.error("Failed to get a response:", response.status, await response.text());
          }
        } catch (error: any) {
          console.error("An error occurred:", error.message);
        } 
      }
    };

    fetchRiskData();
  }, [userQuery]);

  return (
    <main> 
      {showWarning && (
        <div className="bg-red-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TriangleAlertIcon className="w-6 h-6 mr-5" />
            <p>
            If loading takes too long, it may be due to rate limits or downtime. The good news is this project is open source! If you’d like to help maintain it,{" "}
              <Link href="https://github.com/YashitaCodes/swot-spot" className="underline" prefetch={false}>
                Visit Repository
              </Link>
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-red-600"
            onClick={() => setShowWarning(false)}
          >
            <XIcon className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      )}
      <div className="sm:px-16 md:px-24 lg:px-32 flex flex-col min-h-screen bg-accent">
      <header className="top-0 z-30 flex items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="space-y-2 pb-8 flex flex-col items-start pt-10">
          <h1 className="text-4xl font-bold text-muted-foreground">Business Analysis</h1>
          <p className="text-l text-muted-foreground">Your Idea: {userQuery}</p>
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>SWOT Analysis</CardTitle>
            <CardDescription>Strengths, Weaknesses, Opportunities, and Threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Strengths</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {swotData.Strengths.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Weaknesses</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {swotData.Weaknesses.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Opportunities</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {swotData.Opportunities.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Threats</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {swotData.Threats.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Market Segmentation Analysis</CardTitle>
            <CardDescription>Understanding your target audience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Demographic</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {marketData.Demographic.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Psychographic</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {marketData.Psychographic.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Behavioral</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                  <div>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    <Skeleton className="h-6 w-full mb-4 text-primary"/>
                  </div>
                ) : (
                  <ul>
                    {marketData.Behavioral.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>Assessing the competitive landscape</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Competitor 1</h3>
                <ul className="space-y-2 text-sm">
                  {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {competitorData.Competitor1.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Competitor 2</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {competitorData.Competitor2.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Competitor 3</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {competitorData.Competitor3.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Value Proposition Canvas</CardTitle>
            <CardDescription>Defining your unique value offering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Customer Profile</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {valueData.CustomerProfile.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Value Proposition</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {valueData.ValueProposition.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
            <CardDescription>Identifying and mitigating potential risks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Financial Risks</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {riskData.FinancialRisk.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Operational Risks</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {riskData.OperationalRisk.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
              <div className="bg-accent p-4 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Market Risks</h3>
                <ul className="space-y-2 text-sm">
                {loading ? (
                    <div>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                      <Skeleton className="h-6 w-full mb-4 text-primary"/>
                    </div>
                  ) : (
                    <ul>
                      {riskData.OperationalRisk.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
    </main>
  );
}

function TriangleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}