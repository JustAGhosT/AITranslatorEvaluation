"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function LoadingTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isComponentLoading, setIsComponentLoading] = useState(false)

  const simulateLoading = (setter: React.Dispatch<React.SetStateAction<boolean>>, duration = 3000) => {
    setter(true)
    setTimeout(() => setter(false), duration)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Loading States Test Page</h1>
      <p className="mb-8">
        This page allows you to test loading states in individual components. Click the buttons below to simulate
        loading states.
      </p>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => simulateLoading(setIsLoading)}>Simulate Page Loading</Button>
              <Button onClick={() => simulateLoading(setIsComponentLoading)}>Simulate Component Loading</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Loading Spinner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 space-y-4">
              <Loader2 className={`h-8 w-8 ${isLoading ? "animate-spin" : ""}`} />
              <p>This spinner animates when loading is active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Component with Loading State</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-[200px] flex items-center justify-center">
              {isComponentLoading && (
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p>Loading component data...</p>
                  </div>
                </div>
              )}
              <div className="p-4 border rounded-md w-full">
                <h3 className="font-medium mb-2">Component Content</h3>
                <p>This content will be overlaid with a loading indicator when the component is loading.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loading Button States</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button disabled={isLoading} onClick={() => simulateLoading(setIsLoading)}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Click to Load"
              )}
            </Button>

            <Button variant="outline" disabled={isLoading} onClick={() => simulateLoading(setIsLoading)}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Outline Button"
              )}
            </Button>

            <Button variant="secondary" disabled={isLoading} onClick={() => simulateLoading(setIsLoading)}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Secondary Button"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Page Loading:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    isLoading ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {isLoading ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Component Loading:</span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    isComponentLoading ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {isComponentLoading ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
