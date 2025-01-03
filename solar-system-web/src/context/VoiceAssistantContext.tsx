import { createContext, useState, ReactNode } from "react";

interface VoiceAssistantContextType {
  isVoiceAssistantActive: boolean;
  ChangeVoiceAssistantStatus: () => void;
}

export const VoiceAssistantContext = createContext<VoiceAssistantContextType | undefined>(undefined);

export function VoiceAssistantProvider({ children }: { children: ReactNode }) {
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);

  const ChangeVoiceAssistantStatus = () => {
    setIsVoiceAssistantActive(!isVoiceAssistantActive);
  }

  return (
    <VoiceAssistantContext.Provider value={{ isVoiceAssistantActive, ChangeVoiceAssistantStatus }}>
      {children}
    </VoiceAssistantContext.Provider>
  )
}