import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'
import OpenAI from 'openai'

const VoiceControl = ({ onVoiceCommand }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const openai = new OpenAI({
    apiKey: "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",
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  })

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true)
    }
  }, [])

  const startRecording = async () => {
    if (!navigator.mediaDevices) {
      alert('Voice recording is not supported in this browser')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' })
        await processAudioWithAI(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone. Please check permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processAudioWithAI = async (audioBlob) => {
    try {
      // For demo purposes, we'll simulate speech-to-text by showing a prompt
      const command = prompt('Voice command recognized! What would you like to do?\n\nTry:\n- "Add text generator"\n- "Add chatbot"\n- "Save workflow"')
      
      if (command) {
        onVoiceCommand(command)
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      alert('Error processing voice command. Please try again.')
    }
  }

  const processWithWebSpeechAPI = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onVoiceCommand(transcript)
      setIsRecording(false)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
    setIsRecording(true)
  }

  const handleVoiceClick = () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        stopRecording()
      } else {
        setIsRecording(false)
      }
    } else {
      if (isListening && 'webkitSpeechRecognition' in window) {
        processWithWebSpeechAPI()
      } else {
        startRecording()
      }
    }
  }

  return (
    <div className="voice-control-panel">
      <button
        onClick={handleVoiceClick}
        className={`voice-button ${isRecording ? 'recording' : ''}`}
        title={isRecording ? 'Click to stop recording' : 'Click to start voice command'}
      >
        {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      
      {isRecording && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg p-3 shadow-lg border">
          <p className="text-sm font-medium text-red-600">🎤 Listening...</p>
          <p className="text-xs text-gray-600">Say your command</p>
        </div>
      )}
    </div>
  )
}

export default VoiceControl