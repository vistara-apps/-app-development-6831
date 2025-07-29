import React, { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2, Zap, MessageCircle } from 'lucide-react'
import OpenAI from 'openai'

const VoiceControl = ({ onVoiceCommand }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const tooltipTimeoutRef = useRef(null)

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
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript
      setTranscript(currentTranscript)
      
      if (event.results[0].isFinal) {
        onVoiceCommand(currentTranscript)
        setIsRecording(false)
        setTranscript('')
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
      setTranscript('')
    }

    recognition.onend = () => {
      setIsRecording(false)
      setTranscript('')
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

  const handleMouseEnter = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
    }
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false)
    }, 300)
  }

  return (
    <div className="voice-control-panel">
      {/* Main Voice Button */}
      <div className="relative">
        <button
          onClick={handleVoiceClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`voice-button group ${isRecording ? 'recording' : ''}`}
          title={isRecording ? 'Click to stop recording' : 'Click to start voice command'}
        >
          {isRecording ? (
            <div className="relative">
              <MicOff size={24} />
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
            </div>
          ) : (
            <Mic size={24} />
          )}
        </button>

        {/* Pulse Animation Ring */}
        {isRecording && (
          <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></div>
        )}
      </div>

      {/* Recording Status Panel */}
      {isRecording && (
        <div className="absolute bottom-20 right-0 bg-white rounded-xl p-4 shadow-strong border border-gray-200 min-w-[280px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold text-gray-900">Listening...</p>
            <Volume2 size={16} className="text-gray-400" />
          </div>
          
          {transcript && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 italic">"{transcript}"</p>
            </div>
          )}
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>💬 Try: "Add text generator"</p>
            <p>🤖 Try: "Add chatbot"</p>
            <p>💾 Try: "Save workflow"</p>
          </div>
        </div>
      )}

      {/* Help Tooltip */}
      {showTooltip && !isRecording && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white rounded-lg p-3 shadow-strong min-w-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={16} className="text-yellow-400" />
            <p className="text-sm font-medium">Voice Commands</p>
          </div>
          <div className="text-xs space-y-1 opacity-90">
            <p>🎤 Click to start voice control</p>
            <p>🗣️ Speak naturally to add components</p>
            <p>⚡ Works with Web Speech API</p>
          </div>
          
          {/* Tooltip Arrow */}
          <div className="absolute bottom-0 right-6 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="absolute bottom-20 left-0 transform -translate-x-full mr-4 space-y-2">
        <button
          className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center group"
          title="Quick Chat"
        >
          <MessageCircle size={20} className="text-gray-600 group-hover:text-primary-500" />
        </button>
      </div>
    </div>
  )
}

export default VoiceControl
